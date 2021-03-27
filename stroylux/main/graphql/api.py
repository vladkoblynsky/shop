import graphene
from graphene_django.debug import DjangoDebug
from graphene_federation import build_schema

from main.graphql.core.fields import register_graphene_fields
from .account.schema import AccountMutations, AccountQueries
from .blog.schema import BlogQueries, BlogMutations
from .checkout.schema import CheckoutQueries, CheckoutMutations
from .core.schema import CoreMutations, CoreQueries
from .export_import.schema import ImportExportMutations, ImportExportQueries
from .order.schema import OrderQueries, OrderMutations
from .page.schema import PageQueries, PageMutations
from .payment.schema import PaymentMutations, PaymentQueries
from .product.schema import ProductMutations, ProductQueries
from .shipping.schema import ShippingMutations, ShippingQueries
from .shop.schema import ShopQueries, ShopMutations

register_graphene_fields()  # Need for money field order


class Query(
    CoreQueries,
    AccountQueries,
    ProductQueries,
    ShippingQueries,
    PaymentQueries,
    CheckoutQueries,
    OrderQueries,
    BlogQueries,
    ShopQueries,
    PageQueries,
    ImportExportQueries
):
    debug = graphene.Field(DjangoDebug, name='_debug')


class Mutation(
    CoreMutations,
    AccountMutations,
    ProductMutations,
    ShippingMutations,
    PaymentMutations,
    CheckoutMutations,
    OrderMutations,
    ShopMutations,
    BlogMutations,
    PageMutations,
    ImportExportMutations
):
    pass


schema = build_schema(Query, mutation=Mutation)
