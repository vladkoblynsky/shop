from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.core.files import File
from django.core.files.base import ContentFile

from . import ExportObjStatus
from .models import ExportObj
from ..celeryconf import app
from ..product.admin import ProductVariantResource


@app.task
def create_product_variant_export_file(instance_id):
    dataset = ProductVariantResource().export()
    file = File(
        ContentFile(dataset.xlsx),
        name=f"Product Variant {datetime.now().strftime('%Y-%m-%d %H%M%S')}.xlsx"
    )
    try:
        obj = ExportObj.objects.get(pk=instance_id)
        obj.file = file
        obj.status = ExportObjStatus.SUCCESS
        obj.save(update_fields=['file', 'status'])
    except ObjectDoesNotExist:
        return None

