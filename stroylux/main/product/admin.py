from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from import_export.fields import Field

from .models import (Product, ProductType, Category, ProductVariant,
                     ProductImage,
                     VariantImage, Stock, Allocation, ProductReview,
                     ProductReviewImage, Attribute, AttributeValue,
                     AttributeVariant, AttributeProduct,
                     AssignedVariantAttribute, AssignedProductAttribute)


class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = ['id', 'name']


class ProductVariantResource(resources.ModelResource):
    product_name = Field(attribute='product__name', column_name='Продукт')
    price = Field(attribute='price_override_amount', column_name='Цена')
    sku = Field(attribute='sku', column_name='Единица складского учёта')
    name = Field(attribute='name', column_name='Вариант')
    unit = Field(attribute='product__unit', column_name='Ед.изм.')

    class Meta:
        model = ProductVariant
        fields = ['id']
        export_order = ['id', 'product_name', 'name', 'sku', 'unit',
                        'price']


class ProductVariantImportResource(resources.ModelResource):
    price = Field(attribute='price_override_amount', column_name='Цена')
    unit = Field(attribute='product__unit', column_name='Ед.изм.')

    class Meta:
        model = ProductVariant
        fields = ['id']
        export_order = ['id', 'unit', 'price']


@admin.register(ProductType, Category, ProductImage,
                VariantImage, Stock, Allocation, ProductReview,
                ProductReviewImage,
                Attribute, AttributeValue, AttributeProduct, AttributeVariant)
class ProductElementsAdmin(admin.ModelAdmin):
    exclude = ['weight']


class AttributeVariantInline(admin.TabularInline):
    model = AssignedVariantAttribute
    extra = 1


@admin.register(ProductVariant)
class ProductVariantAdmin(ImportExportModelAdmin):
    exclude = ['weight', 'price_override', 'cost_price']
    inlines = (AttributeVariantInline,)
    resource_class = ProductVariantResource


class AttributeProductInline(admin.TabularInline):
    model = AssignedProductAttribute
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['weight']
    list_select_related = ['category']
    list_filter = ['is_published', 'category']
    list_display = ['name', 'category', 'minimal_variant_price_amount']
    search_fields = ('name',)
    view_on_site = True
    inlines = (AttributeProductInline,)

    def view_on_site(self, obj: Product):
        url = f"http://localhost:3000/product/{obj.slug}/{obj.pk}/"
        return url
