import graphene

from main.graphql.core.types import SortInputObjectType


class BlogCategoryOrderField(graphene.Enum):
    NAME = ["name", "slug"]
    PUBLISHED = ["is_published", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            BlogCategoryOrderField.NAME.name: "name",
            BlogCategoryOrderField.PUBLISHED.name: "publication status",
        }
        if self.name in descriptions:
            return f"Sort blog category by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class BlogCategoryOrder(SortInputObjectType):
    field = graphene.Argument(
        BlogCategoryOrderField, description=f"Sort blog category list by the selected field."
    )

    class Meta:
        sort_enum = BlogCategoryOrderField


class BlogArticleOrderField(graphene.Enum):
    TITLE = ["title", "slug"]
    DATE = ["date_published", "date_added", "title", "slug"]
    PUBLISHED = ["is_published", "title", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            BlogCategoryOrderField.TITLE.name: "title",
            BlogCategoryOrderField.PUBLISHED.name: "publication status",
            BlogCategoryOrderField.DATE.name: "date",
        }
        if self.name in descriptions:
            return f"Sort blog article by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class BlogArticleOrder(SortInputObjectType):
    field = graphene.Argument(
        BlogArticleOrderField, description=f"Sort blog article list by the selected field."
    )

    class Meta:
        sort_enum = BlogArticleOrderField
