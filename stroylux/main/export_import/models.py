import os

from django.contrib.postgres.fields import JSONField
from django.db import models
from private_storage.fields import PrivateFileField
from private_storage.storage.files import PrivateFileSystemStorage

from main.core.permissions import ProductPermissions
from main.export_import import ExportObjStatus


class ExportFileStorage(PrivateFileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            self.delete(name)
        return name


efs = ExportFileStorage()


def export_obj_directory_path(instance: "ExportObj", filename):
    return os.path.join('export', '%s' % filename)


class ExportObjQueryset(models.QuerySet):

    @staticmethod
    def user_has_access_to_all(user):
        return user.is_active and user.has_perm(
            ProductPermissions.MANAGE_PRODUCTS)

    def visible_to_user(self, user):
        if self.user_has_access_to_all(user):
            return self.all()
        return self.none()


class ExportObj(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    file = PrivateFileField(upload_to=export_obj_directory_path, storage=efs,
                            default=None, null=True)
    file_url = models.URLField()
    model_name = models.CharField(max_length=255)
    queryset = JSONField(default=list)
    status = models.CharField(choices=ExportObjStatus.CHOICES,
                              default=ExportObjStatus.IN_PROGRESS,
                              max_length=100)

    objects = ExportObjQueryset.as_manager()

    @property
    def file_name(self):
        return os.path.basename(self.file.name) if self.file else None

    @property
    def storage_url(self):
        return self.file.url if self.file else None
