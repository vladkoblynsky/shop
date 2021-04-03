from django.db import transaction
from typing import List


@transaction.atomic
def delete_export_objects(ids: List[str]):
    """Delete blog categories and perform all necessary actions."""
    from .models import ExportObj

    for instance in ExportObj.objects.select_for_update().filter(pk__in=ids):
        if instance.file:
            instance.file.delete()
        instance.delete()
