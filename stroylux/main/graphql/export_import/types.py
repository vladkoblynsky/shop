import graphene
from graphene import relay
from graphene_federation import key

from main.core.utils import build_absolute_uri
from main.export_import.models import ExportObj
from main.graphql.core.connection import CountableDjangoObjectType


@key(fields="id")
class ExportObjType(CountableDjangoObjectType):
    file_name = graphene.String()
    storage_url = graphene.String()

    class Meta:
        description = "Represents an Export Object."
        only_fields = ["status", "id", "file_url", "created"]
        interfaces = [relay.Node]
        model = ExportObj

    def resolve_file_name(self: ExportObj, info):
        return self.file_name

    def resolve_storage_url(self: ExportObj, info):
        return build_absolute_uri(self.storage_url)
