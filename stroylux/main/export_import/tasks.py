import logging
from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.core.files import File
from django.core.files.base import ContentFile
from django.utils.encoding import force_str
from import_export.admin import ImportMixin
from import_export.results import Result

from . import ExportObjStatus
from .models import ExportObj
from ..celeryconf import app
from ..product.admin import ProductVariantExportResource, \
    ProductVariantImportResource, ProductExportResource

logger = logging.getLogger(__name__)


@app.task
def create_product_variant_export_file(instance_id: str or int,
                                       file_format: str):
    dataset = ProductVariantExportResource().export()
    dataset_file = getattr(dataset, file_format)
    file = File(
        ContentFile(dataset_file),
        name=f"Product Variants {datetime.now().strftime('%Y-%m-%d %H%M%S')}.${file_format}"
    )
    try:
        obj = ExportObj.objects.get(pk=instance_id)
        obj.file = file
        obj.status = ExportObjStatus.SUCCESS
        obj.save()
    except ObjectDoesNotExist:
        return None
    except Exception as e:
        logger.error(e)
        obj = ExportObj.objects.get(pk=instance_id)
        obj.status = ExportObjStatus.ERROR
        obj.save()


@app.task
def product_variant_import(file_name: str,
                           file_format: int):
    import_mixin = ImportMixin()
    import_formats = import_mixin.get_import_formats()
    input_format = import_formats[file_format]()
    tmp_storage = import_mixin.get_tmp_storage_class()(name=file_name)
    data = tmp_storage.read(input_format.get_read_mode())
    if not input_format.is_binary() and import_mixin.from_encoding:
        data = force_str(data, import_mixin.from_encoding)
    dataset = input_format.create_dataset(data)
    tmp_storage.remove()
    result: Result = ProductVariantImportResource().import_data(dataset,
                                                                dry_run=True)
    if not result.has_errors():
        ProductVariantImportResource().import_data(dataset, dry_run=False)


@app.task
def create_product_export_file(instance_id: str or int,
                               file_format: str):
    dataset = ProductExportResource().export()
    dataset_file = getattr(dataset, file_format)
    file = File(
        ContentFile(dataset_file),
        name=f"Products {datetime.now().strftime('%Y-%m-%d %H%M%S')}.${file_format}"
    )
    try:
        obj = ExportObj.objects.get(pk=instance_id)
        obj.file = file
        obj.status = ExportObjStatus.SUCCESS
        obj.save()
    except ObjectDoesNotExist:
        return None
    except Exception as e:
        logger.error(e)
        obj = ExportObj.objects.get(pk=instance_id)
        obj.status = ExportObjStatus.ERROR
        obj.save()
