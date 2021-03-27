import django_filters

from main.graphql.core.types import FilterInputObjectType
from main.export_import.models import ExportObj


class ExportObjFilter(django_filters.FilterSet):
    class Meta:
        model = ExportObj
        fields = [
            "status"
        ]


class ExportObjFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = ExportObjFilter
