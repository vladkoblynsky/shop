from ..checkout.error_codes import CheckoutErrorCode


class InsufficientStock(Exception):
    def __init__(self, item):
        super().__init__("Insufficient stock for %r" % (item,))
        self.item = item
        self.code = CheckoutErrorCode.INSUFFICIENT_STOCK


class AllocationError(Exception):
    def __init__(self, order_line, quantity):
        super().__init__(
            f"Can't deallocate {quantity} for variant: {order_line.variant}"
            f" in order: {order_line.order}"
        )
        self.order_line = order_line
        self.quantity = quantity


class ReadOnlyException(Exception):
    def __init__(self, msg=None):
        if msg is None:
            msg = "API runs in read-only mode"
        super().__init__(msg)


class PermissionDenied(Exception):
    def __init__(self, message=None):
        default_message = "You do not have permission to perform this action"
        if message is None:
            message = default_message
        super().__init__(message)