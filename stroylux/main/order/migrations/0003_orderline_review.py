# Generated by Django 3.0.5 on 2020-07-04 09:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_product_maximal_variant_price_amount'),
        ('order', '0002_auto_20200429_1809'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderline',
            name='review',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.ProductReview'),
        ),
    ]
