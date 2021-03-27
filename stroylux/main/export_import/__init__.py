class ExportObjStatus:
    SUCCESS = 'success'
    ERROR = 'error'
    IN_PROGRESS = 'in_progress'

    CHOICES = [
        (SUCCESS, 'Success'),
        (ERROR, 'Error'),
        (IN_PROGRESS, 'In progress'),
    ]
