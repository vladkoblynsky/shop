from uuid import uuid4

import graphene
from django.core.files.uploadedfile import InMemoryUploadedFile
from import_export.admin import ExportMixin, ImportMixin

from main.core.exceptions import PermissionDenied
from main.core.permissions import ProductPermissions
from main.core.utils import build_absolute_uri
from main.export_import.models import ExportObj
from main.export_import.tasks import create_product_variant_export_file, \
    product_variant_import
from main.graphql.core.mutations import BaseMutation, ModelDeleteMutation
from main.graphql.core.types import Upload
from main.graphql.core.types.common import ProductError
from main.graphql.core.utils import str_to_enum
from main.graphql.export_import.types import ExportObjType
from main.product.models import ProductVariant


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
        file_format = data.get('file_format', 'xlsx')
        file_url = str(uuid4())
        url = build_absolute_uri(f"/download/{file_url}")
        export_obj = ExportObj.objects.create(
            file_url=file_url,
            model_name='ProductVariant',
            queryset=list(ProductVariant.objects.values_list('id', flat=True))
        )
        if ProductVariant.objects.count() < 10000:
            create_product_variant_export_file(export_obj.id,
                                               file_format)
        else:
            create_product_variant_export_file.delay(export_obj.id,
                                                     file_format)
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


FILE_FORMAT = {
    'csv': 0,
    'xls': 1,
    'xlsx': 2,
    'tsv': 3,
    'json': 4,
    'yaml': 5
}


class ProductVariantImport(BaseMutation):
    class Arguments:
        file = Upload(
            required=True,
            description="Represents a file in a multipart request.",
        )

    class Meta:
        description = (
            "Import product variants from file"
        )
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def perform_mutation(cls, root, info, **data):
        file_format = FILE_FORMAT.get('xlsx', FILE_FORMAT['xlsx'])
        file_index = data.get('file')
        file: InMemoryUploadedFile = info.context.FILES.get(file_index)
        if file:
            import_mixin = ImportMixin()
            import_formats = import_mixin.get_import_formats()
            input_format = import_formats[file_format]()
            tmp_storage = import_mixin.write_to_tmp_storage(file, input_format)
            product_variant_import.delay(tmp_storage.name, file_format)
        return cls()
