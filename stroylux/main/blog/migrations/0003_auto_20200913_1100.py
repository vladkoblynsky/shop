# Generated by Django 3.0.5 on 2020-09-13 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20200913_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='subscribers',
            field=models.ManyToManyField(default=None, null=True, related_name='blog', to='blog.BlogSubscriber'),
        ),
    ]