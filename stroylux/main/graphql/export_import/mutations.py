from uuid import uuid4

import graphene
from import_export.admin import ExportMixin

from main.core.exceptions import PermissionDenied
from main.core.permissions import ProductPermissions
from main.core.utils import build_absolute_uri
from main.graphql.core.mutations import BaseMutation, ModelMutation, \
    ModelDeleteMutation
from main.graphql.core.types.common import ProductError
from main.graphql.core.utils import str_to_enum
from main.export_import import ExportObjStatus
from main.graphql.export_import.types import ExportObjType
from main.product.models import ProductVariant
from main.export_import.models import ExportObj
from django.apps import apps
from main.export_import.tasks import create_product_variant_export_file


class ProductVariantExport(BaseMutation):
    url = graphene.String()

    class Arguments:
        file_format = graphene.Argument(graphene.Enum(
            'FileFormatEnum',
            [(str_to_enum(f().get_title()), f().get_title()) for f in
             ExportMixin().get_export_formats()],
        ),
            required=False,
            description="File format (xlsx, json, csv...).",
        )

    class Meta:
        description = "Export product variants."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, root, info, **data):
        print(info.context, data)

        # file_format = data.get('file_format', 'xlsx')
        file_url = str(uuid4())
        url = build_absolute_uri(f"/download/{file_url}")
        export_obj = ExportObj.objects.create(
            file_url=file_url,
            model_name='ProductVariant',
            queryset=list(ProductVariant.objects.values_list('id', flat=True))
        )
        create_product_variant_export_file.delay(export_obj.id)
        return cls(url=url)


class ExportObjDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True,
                         description="ID of a export obj to delete.")

    class Meta:
        description = "Deletes an export object."
        model = ExportObj
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not cls.check_permissions(info.context):
            raise PermissionDenied()
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id,
                                         only_type=ExportObjType)

        db_id = instance.id
        if instance.file:
            instance.file.delete()
        instance.delete()

        instance.id = db_id
        return cls.success_response(instance)
