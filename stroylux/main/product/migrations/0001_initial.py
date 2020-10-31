# Generated by Django 3.0.5 on 2020-04-29 15:09

import django.contrib.postgres.fields.jsonb
from django.contrib.postgres.operations import TrigramExtension
from django.db import migrations, models
import django.db.models.deletion
import django_measurement.models
import main.core.weight
import measurement.measures.mass
import versatileimagefield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True)),
                ('description_json', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict)),
                ('background_image', versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='category-backgrounds')),
                ('background_image_alt', models.CharField(blank=True, max_length=128)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='product.Category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publication_date', models.DateField(blank=True, null=True)),
                ('is_published', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=250)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('description', models.TextField(blank=True)),
                ('description_json', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict)),
                ('currency', models.CharField(default='BYN', max_length=3)),
                ('minimal_variant_price_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='product.Category')),
            ],
            options={
                'ordering': ('name',),
                'permissions': (('manage_products', 'Manage products.'),),
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(db_index=True, editable=False, null=True)),
                ('image', versatileimagefield.fields.VersatileImageField(upload_to='products')),
                ('ppoi', versatileimagefield.fields.PPOIField(default='0.5x0.5', editable=False, max_length=20)),
                ('alt', models.CharField(blank=True, max_length=128)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='product.Product')),
            ],
            options={
                'ordering': ('sort_order',),
            },
        ),
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('has_variants', models.BooleanField(default=True)),
                ('is_shipping_required', models.BooleanField(default=True)),
                ('is_digital', models.BooleanField(default=False)),
                ('weight', django_measurement.models.MeasurementField(default=main.core.weight.zero_weight, measurement=measurement.measures.mass.Mass)),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sku', models.CharField(max_length=255, unique=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('currency', models.CharField(blank=True, default='BYN', max_length=3, null=True)),
                ('price_override_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('cost_price_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ('weight', django_measurement.models.MeasurementField(default=main.core.weight.zero_weight, measurement=measurement.measures.mass.Mass)),
            ],
            options={
                'ordering': ('sku',),
            },
        ),
        migrations.CreateModel(
            name='VariantImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variant_images', to='product.ProductImage')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variant_images', to='product.ProductVariant')),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('product_variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stocks', to='product.ProductVariant')),
            ],
            options={
                'ordering': ('pk',),
            },
        ),
        migrations.AddField(
            model_name='productvariant',
            name='images',
            field=models.ManyToManyField(through='product.VariantImage', to='product.ProductImage'),
        ),
        migrations.AddField(
            model_name='productvariant',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='product.Product'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='product.ProductType'),
        ),
        migrations.CreateModel(
            name='Allocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity_allocated', models.PositiveIntegerField(default=0)),
                ('order_line', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='allocations', to='order.OrderLine')),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='allocations', to='product.Stock')),
            ],
            options={
                'ordering': ('pk',),
                'unique_together': {('order_line', 'stock')},
            },
        ),
        TrigramExtension()
    ]
