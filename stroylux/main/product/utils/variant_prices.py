from typing import TYPE_CHECKING
from prices import Money
from ..models import Product

if TYPE_CHECKING:
    # flake8: noqa
    from datetime import date, datetime

    from django.db.models.query import QuerySet

    from ..models import Product, Category


def collect_categories_tree_products(category: "Category") -> "QuerySet[Product]":
    """Collect products from all levels in category tree."""
    products = category.products.all()
    descendants = category.get_descendants()
    for descendant in descendants:
        products = products | descendant.products.all()
    return products


def _get_product_minimal_variant_price(product, discounts) -> Money:
    # Start with the product's price as the minimal one
    minimal_variant_price = Money(amount=100000, currency=product.currency)
    variants = product.variants.all()
    for variant in variants:
        variant_price = variant.base_price
        minimal_variant_price = min(minimal_variant_price, variant_price)
    if not variants:
        minimal_variant_price = Money(amount=0, currency=product.currency)
    return minimal_variant_price


def _get_product_maximal_variant_price(product, discounts) -> Money:
    # Start with the product's price as the maximal one
    maximal_variant_price = Money(amount=0, currency=product.currency)
    variants = product.variants.all()
    for variant in product.variants.all():
        variant_price = variant.base_price
        maximal_variant_price = max(maximal_variant_price, variant_price)
    if not variants:
        maximal_variant_price = Money(amount=0, currency=product.currency)
    return maximal_variant_price


def update_product_variant_price(product, discounts=None, save=True):
    # if discounts is None:
    # discounts = fetch_active_discounts()
    minimal_variant_price = _get_product_minimal_variant_price(product, discounts)
    maximal_variant_price = _get_product_maximal_variant_price(product, discounts)
    if product.minimal_variant_price != minimal_variant_price:
        product.minimal_variant_price_amount = minimal_variant_price.amount
    if product.maximal_variant_price != maximal_variant_price:
        product.maximal_variant_price_amount = maximal_variant_price.amount
    if save:
        product.save(update_fields=["minimal_variant_price_amount", "maximal_variant_price_amount", "updated_at"])
    return product


def update_products_variant_prices(products, discounts=None):
    # if discounts is None:
    # discounts = fetch_active_discounts()
    changed_products_to_update = []
    for product in products:
        old_minimal_variant_price = product.minimal_variant_price
        old_maximal_variant_price = product.maximal_variant_price
        updated_product = update_product_variant_price(
            product, discounts, save=False
        )
        # Check if the "variant_price" has changed
        if updated_product.minimal_variant_price != old_minimal_variant_price or \
                updated_product.maximal_variant_price != old_maximal_variant_price:
            changed_products_to_update.append(updated_product)
    # Bulk update the changed products
    Product.objects.bulk_update(
        changed_products_to_update, ["minimal_variant_price_amount", "maximal_variant_price_amount"]
    )
