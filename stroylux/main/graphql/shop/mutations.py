import graphene
from django.core.exceptions import ValidationError

from .enums import AuthorizationKeyType
from ...account import models as account_models
from ...site import models as site_models

from main.core.error_codes import ShopErrorCode
from main.core.permissions import SitePermissions
from main.core.utils.url import validate_storefront_url
from main.graphql.account.i18n import I18nMixin
from main.graphql.account.types import AddressInput
from main.graphql.core.enums import WeightUnitsEnum
from main.graphql.core.mutations import BaseMutation
from main.graphql.core.types.common import ShopError
from main.graphql.shop.types import Shop, AuthorizationKey


class ShopSettingsInput(graphene.InputObjectType):
    header_text = graphene.String(description="Header text.")
    description = graphene.String(description="SEO description.")
    include_taxes_in_prices = graphene.Boolean(description="Include taxes in prices.")
    display_gross_prices = graphene.Boolean(
        description="Display prices with tax in store."
    )
    charge_taxes_on_shipping = graphene.Boolean(description="Charge taxes on shipping.")
    track_inventory_by_default = graphene.Boolean(
        description="Enable inventory tracking."
    )
    default_weight_unit = WeightUnitsEnum(description="Default weight unit.")
    automatic_fulfillment_digital_products = graphene.Boolean(
        description="Enable automatic fulfillment for all digital products."
    )
    default_digital_max_downloads = graphene.Int(
        description="Default number of max downloads per digital content URL."
    )
    default_digital_url_valid_days = graphene.Int(
        description="Default number of days which digital content URL will be valid."
    )
    default_mail_sender_name = graphene.String(
        description="Default email sender's name."
    )
    default_mail_sender_address = graphene.String(
        description="Default email sender's address."
    )
    customer_set_password_url = graphene.String(
        description="URL of a view where customers can set their password."
    )


class SiteDomainInput(graphene.InputObjectType):
    domain = graphene.String(description="Domain name for shop.")
    name = graphene.String(description="Shop site name.")


class ShopSettingsUpdate(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = ShopSettingsInput(
            description="Fields required to update shop settings.", required=True
        )

    class Meta:
        description = "Updates shop settings."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def clean_input(cls, _info, _instance, data):
        if data.get("customer_set_password_url"):
            try:
                validate_storefront_url(data["customer_set_password_url"])
            except ValidationError as error:
                raise ValidationError(
                    {"customer_set_password_url": error}, code=ShopErrorCode.INVALID
                )
        return data

    @classmethod
    def construct_instance(cls, instance, cleaned_data):
        for field_name, desired_value in cleaned_data.items():
            current_value = getattr(instance, field_name)
            if current_value != desired_value:
                setattr(instance, field_name, desired_value)
        return instance

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = info.context.site.settings
        data = data.get("input")
        cleaned_input = cls.clean_input(info, instance, data)
        instance = cls.construct_instance(instance, cleaned_input)
        cls.clean_instance(info, instance)
        instance.save()
        return ShopSettingsUpdate(shop=Shop())


class ShopAddressUpdate(BaseMutation, I18nMixin):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = AddressInput(description="Fields required to update shop address.")

    class Meta:
        description = (
            "Update the shop's address. If the `null` value is passed, the currently "
            "selected address will be deleted."
        )
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        site_settings = info.context.site.settings
        data = data.get("input")

        if data:
            if not site_settings.company_address:
                company_address = account_models.Address()
            else:
                company_address = site_settings.company_address
            company_address = cls.validate_address(data, company_address, info=info)
            company_address.save()
            site_settings.company_address = company_address
            site_settings.save(update_fields=["company_address"])
        else:
            if site_settings.company_address:
                site_settings.company_address.delete()
        return ShopAddressUpdate(shop=Shop())


class ShopDomainUpdate(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = SiteDomainInput(description="Fields required to update site.")

    class Meta:
        description = "Updates site domain of the shop."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        site = info.context.site
        data = data.get("input")
        domain = data.get("domain")
        name = data.get("name")
        if domain is not None:
            site.domain = domain
        if name is not None:
            site.name = name
        cls.clean_instance(info, site)
        site.save()
        return ShopDomainUpdate(shop=Shop())


class AuthorizationKeyInput(graphene.InputObjectType):
    key = graphene.String(
        required=True, description="Client authorization key (client ID)."
    )
    password = graphene.String(required=True, description="Client secret.")


class AuthorizationKeyAdd(BaseMutation):
    authorization_key = graphene.Field(
        AuthorizationKey, description="Newly added authorization key."
    )
    shop = graphene.Field(Shop, description="Updated shop.")

    class Meta:
        description = "Adds an authorization key."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    class Arguments:
        key_type = AuthorizationKeyType(
            required=True, description="Type of an authorization key to add."
        )
        input = AuthorizationKeyInput(
            required=True, description="Fields required to create an authorization key."
        )

    @classmethod
    def perform_mutation(cls, _root, info, key_type, **data):
        if site_models.AuthorizationKey.objects.filter(name=key_type).exists():
            raise ValidationError(
                {
                    "key_type": ValidationError(
                        "Authorization key already exists.",
                        code=ShopErrorCode.ALREADY_EXISTS,
                    )
                }
            )

        site_settings = info.context.site.settings
        instance = site_models.AuthorizationKey(
            name=key_type, site_settings=site_settings, **data.get("input")
        )
        cls.clean_instance(info, instance)
        instance.save()
        return AuthorizationKeyAdd(authorization_key=instance, shop=Shop())


class AuthorizationKeyDelete(BaseMutation):
    authorization_key = graphene.Field(
        AuthorizationKey, description="Authorization key that was deleted."
    )
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        key_type = AuthorizationKeyType(
            required=True, description="Type of a key to delete."
        )

    class Meta:
        description = "Deletes an authorization key."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, key_type):
        try:
            site_settings = info.context.site.settings
            instance = site_models.AuthorizationKey.objects.get(
                name=key_type, site_settings=site_settings
            )
        except site_models.AuthorizationKey.DoesNotExist:
            raise ValidationError(
                {
                    "key_type": ValidationError(
                        "Couldn't resolve authorization key",
                        code=ShopErrorCode.NOT_FOUND,
                    )
                }
            )

        instance.delete()
        return AuthorizationKeyDelete(authorization_key=instance, shop=Shop())