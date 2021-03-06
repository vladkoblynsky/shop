# Generated by Django 3.0.7 on 2021-03-27 13:08

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import main.export_import.models
import private_storage.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExportObj',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('file', private_storage.fields.PrivateFileField(default=None, null=True, storage=main.export_import.models.ExportFileStorage(), upload_to=main.export_import.models.export_obj_directory_path)),
                ('file_url', models.URLField()),
                ('model_name', models.CharField(max_length=255)),
                ('queryset', django.contrib.postgres.fields.jsonb.JSONField(default=list)),
                ('status', models.CharField(choices=[('success', 'Success'), ('error', 'Error'), ('in_progress', 'In progress')], default='in_progress', max_length=100)),
            ],
        ),
    ]
