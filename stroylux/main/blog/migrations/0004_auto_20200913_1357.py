# Generated by Django 3.0.5 on 2020-09-13 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20200913_1100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='subscribers',
            field=models.ManyToManyField(related_name='blog', to='blog.BlogSubscriber'),
        ),
    ]