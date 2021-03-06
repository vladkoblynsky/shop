from urllib.parse import urlencode

from templated_email import send_templated_mail

from .. import settings
from ..celeryconf import app
from ..core.emails import get_email_context, prepare_url
from ..seo.schema.email import get_order_confirmation_markup
from . import events
from .models import Order

CONFIRM_ORDER_TEMPLATE = "order/confirm_order"
STAFF_CONFIRM_ORDER_TEMPLATE = "order/staff_confirm_order"
CONFIRM_PAYMENT_TEMPLATE = "order/payment/confirm_payment"


def collect_staff_order_notification_data(
    order_pk: int, template: str, redirect_url: str
) -> dict:
    data = collect_data_for_email(order_pk, template, redirect_url)
    recipient_emails = [
        settings.ADMINS[0][0]
    ]
    data["recipient_list"] = recipient_emails
    return data


def collect_data_for_email(
    order_pk: int, template: str, redirect_url: str = ""
) -> dict:
    """Collect the required data for sending emails."""
    order = Order.objects.get(pk=order_pk)
    recipient_email = order.get_customer_email()
    send_kwargs, email_context = get_email_context()

    email_context["order_details_url"] = (
        prepare_order_details_url(order, redirect_url) if redirect_url else ""
    )
    email_context["order"] = order

    # Order confirmation template requires additional information
    if template in [CONFIRM_ORDER_TEMPLATE, STAFF_CONFIRM_ORDER_TEMPLATE]:
        email_markup = get_order_confirmation_markup(order)
        email_context["schema_markup"] = email_markup

    return {
        "recipient_list": [recipient_email],
        "template_name": template,
        "context": email_context,
        **send_kwargs,
    }


def prepare_order_details_url(order: Order, redirect_url: str) -> str:
    params = urlencode({"token": order.token})
    return prepare_url(params, redirect_url)


@app.task
def send_order_confirmation(order_pk, redirect_url, user_pk=None):
    """Send order confirmation email."""
    email_data = collect_data_for_email(order_pk, CONFIRM_ORDER_TEMPLATE, redirect_url)
    send_templated_mail(**email_data)
    events.email_sent_event(
        order=email_data["context"]["order"],
        user=None,
        user_pk=user_pk,
        email_type=events.OrderEventsEmails.ORDER,
    )


@app.task
def send_staff_order_confirmation(order_pk, redirect_url):
    """Send order confirmation email."""
    staff_email_data = collect_staff_order_notification_data(
        order_pk, STAFF_CONFIRM_ORDER_TEMPLATE, redirect_url
    )
    if staff_email_data["recipient_list"]:
        send_templated_mail(**staff_email_data)


@app.task
def send_payment_confirmation(order_pk):
    """Send the payment confirmation email."""
    email_data = collect_data_for_email(order_pk, CONFIRM_PAYMENT_TEMPLATE)
    send_templated_mail(**email_data)
