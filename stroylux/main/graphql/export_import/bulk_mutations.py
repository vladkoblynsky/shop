import graphene

from main.core.permissions import ProductPermissions
from main.export_import.models import ExportObj
from main.export_import.utils import delete_export_objects
from main.graphql.core.mutations import ModelBulkDeleteMutation
from main.graphql.core.types.common import ProductError


class ExportObjBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True,
            description="List of export obj IDs to delete."
        )

    class Meta:
        description = "Delete export objects."
        model = ExportObj
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def bulk_action(cls, queryset):
        delete_export_objects(queryset.values_list("pk", flat=True))
