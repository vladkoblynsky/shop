from typing import TYPE_CHECKING

from django.conf import settings
from django.db.models import Sum
from django.db.models.functions import Coalesce

from ..core.exceptions import InsufficientStock
from .models import Stock, StockQuerySet

if TYPE_CHECKING:
    from ..product.models import Product, ProductVariant


def _get_quantity_allocated(stocks: StockQuerySet) -> int:
    return stocks.aggregate(
        quantity_allocated=Coalesce(Sum("allocations__quantity_allocated"), 0)
    )["quantity_allocated"]


def _get_available_quantity(stocks: StockQuerySet) -> int:
    quantity_allocated = _get_quantity_allocated(stocks)
    total_quantity = stocks.aggregate(total_quantity=Coalesce(Sum("quantity"), 0))[
        "total_quantity"
    ]
    return max(total_quantity - quantity_allocated, 0)


def check_stock_quantity(variant: "ProductVariant", quantity: int):
    """Validate if there is stock available for given variant in given country.
    If so - returns None. If there is less stock then required rise InsufficientStock
    exception.
    """
    stocks = Stock.objects.filter(product_variant=variant)
    if not stocks:
        raise InsufficientStock(variant)

    if quantity > _get_available_quantity(stocks):
        raise InsufficientStock(variant)


def get_available_quantity(variant: "ProductVariant") -> int:
    """Return available quantity for given product in given country."""
    stocks = Stock.objects.filter(product_variant=variant)
    if not stocks:
        return 0
    return _get_available_quantity(stocks)


def get_available_quantity_for_customer(
        variant: "ProductVariant"
) -> int:
    """Return maximum checkout line quantity."""
    stocks = Stock.objects.filter(product_variant=variant)
    if not stocks:
        return 0
    return min(_get_available_quantity(stocks), settings.MAX_CHECKOUT_LINE_QUANTITY)


def get_quantity_allocated(variant: "ProductVariant") -> int:
    stocks = Stock.objects.filter(product_variant=variant)
    if not stocks:
        return 0
    return _get_quantity_allocated(stocks)


def is_variant_in_stock(variant: "ProductVariant") -> bool:
    """Check if variant is available in given country."""
    quantity_available = get_available_quantity(variant)
    return quantity_available > 0


def stocks_for_product(product: "Product"):
    return (
        Stock.objects.annotate_available_quantity().filter(product_variant__product_id=product.pk)
    )


def is_product_in_stock(product: "Product") -> bool:
    """Check if there is any variant of given product available in given country."""
    return any(
        stocks_for_product(product).values_list(
            "available_quantity", flat=True
        )
    )


def are_all_product_variants_in_stock(product: "Product") -> bool:
    """Check if all variants of given product are available in given country."""
    product_stocks = (
        stocks_for_product(product)
            .values_list("available_quantity", "product_variant_id")
            .all()
    )
    are_all_available = all([elem[0] for elem in product_stocks])
    variants_with_stocks = [elem[1] for elem in product_stocks]

    product_variants = product.variants.exclude(id__in=variants_with_stocks).exists()
    return are_all_available and not product_variants
