import graphene

from main.graphql.core.fields import FilterInputConnectionField
from main.graphql.export_import.bulk_mutations import ExportObjBulkDelete
from main.graphql.export_import.filters import ExportObjFilterInput
from main.graphql.export_import.mutations import ProductVariantExport, \
    ExportObjDelete, ProductVariantImport
from main.graphql.export_import.resolvers import resolve_export_obj_list
from main.graphql.export_import.sorters import ExportObjOrder
from main.graphql.export_import.types import ExportObjType


class ImportExportQueries:
    export_obj = graphene.Field(
        ExportObjType,
        id=graphene.Argument(
            graphene.ID, required=True, description="ID of the export obj."
        ),
        description="Look up a export obj by ID.",
    )
    export_obj_list = FilterInputConnectionField(
        ExportObjType,
        filter=ExportObjFilterInput(
            description="Filtering options for export objects."),
        sort_by=ExportObjOrder(description="Sort export objects."),
        ids=graphene.List(
            graphene.ID, description="Filter export objects by given IDs."
        ),
        description="List of the shop's export objects.",
    )

    @staticmethod
    def resolve_export_obj(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, ExportObjType)

    @staticmethod
    def resolve_export_obj_list(self, info, ids=None, **kwargs):
        return resolve_export_obj_list(info, ids, **kwargs)


class ImportExportMutations(graphene.ObjectType):
    product_variant_export = ProductVariantExport.Field()
    product_variant_import = ProductVariantImport.Field()

    export_obj_delete = ExportObjDelete.Field()
    export_obj_bulk_delete = ExportObjBulkDelete.Field()
