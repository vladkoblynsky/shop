import graphene

from main.graphql.core.types import SortInputObjectType


class ExportObjOrderField(graphene.Enum):
    STATUS = ["status"]
    DATE = ["created", "status"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            ExportObjOrderField.STATUS.name: "status",
            ExportObjOrderField.DATE.name: "create date",
        }
        if self.name in descriptions:
            return f"Sort export objects by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class ExportObjOrder(SortInputObjectType):
    attribute_id = graphene.Argument(
        graphene.ID,
        description=(
            "Sort export object.\n"
            "Note: this doesn't take translations into account yet."
        ),
    )
    field = graphene.Argument(
        ExportObjOrderField,
        description=f"Sort export objects by the selected field."
    )

    class Meta:
        sort_enum = ExportObjOrderField
