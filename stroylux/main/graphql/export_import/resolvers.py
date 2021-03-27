import main.export_import.models as import_export_models
from main.graphql.utils import get_database_id
import graphene_django_optimizer as gql_optimizer


def resolve_export_obj_list(info, ids, **_kwargs):
    user = info.context.user
    qs = import_export_models.ExportObj.objects.visible_to_user(user)

    qs = qs.distinct()

    if ids:
        db_ids = [get_database_id(info, node_id, "ExportObjType") for node_id in ids]
        qs = qs.filter(pk__in=db_ids)

    return gql_optimizer.query(qs, info)
