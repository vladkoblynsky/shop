import graphene
from django.contrib.auth import models as auth_models
from graphql_jwt.exceptions import PermissionDenied
import graphene_django_optimizer as gql_optimizer

from main.account import models
from main.core.permissions import AccountPermissions
from main.graphql.account.utils import get_user_permissions
from main.graphql.utils import format_permissions_for_display, filter_by_query_param

USER_SEARCH_FIELDS = (
    "email",
    "first_name",
    "last_name",
    "default_shipping_address__first_name",
    "default_shipping_address__last_name",
    "default_shipping_address__city",
    "default_shipping_address__country",
)


def resolve_permissions(root: models.User):
    permissions = get_user_permissions(root)
    permissions = permissions.prefetch_related("content_type").order_by("codename")
    return format_permissions_for_display(permissions)


def resolve_address(info, id):
    user = info.context.user
    # app = info.context.app
    _model, address_pk = graphene.Node.from_global_id(id)
    # if app and app.has_perm(AccountPermissions.MANAGE_USERS):
    #     return models.Address.objects.filter(pk=address_pk).first()
    if user and not user.is_anonymous:
        return user.addresses.filter(id=address_pk).first()
    return PermissionDenied()


def resolve_permission_groups(info, **_kwargs):
    qs = auth_models.Group.objects.all()
    return gql_optimizer.query(qs, info)


def resolve_user(info, id):
    requester = info.context.user
    if requester:
        _model, user_pk = graphene.Node.from_global_id(id)
        if requester.has_perms(
                [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
        ):
            return models.User.objects.filter(pk=user_pk).first()
        if requester.has_perm(AccountPermissions.MANAGE_STAFF):
            return models.User.objects.staff().filter(pk=user_pk).first()
        if requester.has_perm(AccountPermissions.MANAGE_USERS):
            return models.User.objects.customers().filter(pk=user_pk).first()
    return PermissionDenied()


def resolve_staff_users(info, query, **_kwargs):
    qs = models.User.objects.staff()
    qs = filter_by_query_param(
        queryset=qs, query=query, search_fields=USER_SEARCH_FIELDS
    )
    return qs.distinct()


def resolve_customers(info, query, **_kwargs):
    qs = models.User.objects.customers()
    qs = filter_by_query_param(
        queryset=qs, query=query, search_fields=USER_SEARCH_FIELDS
    )
    return qs.distinct()
