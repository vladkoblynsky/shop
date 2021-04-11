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


class BaseProductResource(resources.ModelResource):
    name = Field(attribute='name', column_name='Продукт')
    description = Field(attribute='description', column_name='Описание')
    unit = Field(attribute='unit', column_name='Ед.изм.')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'unit']


class ProductExportResource(BaseProductResource):
    class Meta(BaseProductResource.Meta):
        export_order = ['id', 'name', 'description', 'unit']


class BaseProductVariantResource(resources.ModelResource):
    price = Field(attribute='price_override_amount', column_name='Цена')
    unit = Field(attribute='product__unit', column_name='Ед.изм.')

    class Meta:
        model = ProductVariant
        fields = ['id']


class ProductVariantExportResource(BaseProductVariantResource):
    product_name = Field(attribute='product__name', column_name='Продукт')
    sku = Field(attribute='sku', column_name='Единица складского учёта')
    name = Field(attribute='name', column_name='Вариант')

    class Meta(BaseProductVariantResource.Meta):
        export_order = ['id', 'product_name', 'name', 'sku', 'unit',
                        'price']


class ProductVariantImportResource(BaseProductVariantResource):
    class Meta(BaseProductVariantResource.Meta):
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
    resource_class = ProductVariantExportResource


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
