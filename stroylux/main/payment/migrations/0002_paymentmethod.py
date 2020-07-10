# Generated by Django 3.0.5 on 2020-05-24 07:01

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('base_url', models.URLField(max_length=100)),
                ('credentials_schema', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
