import NotFoundPage from "@temp/components/NotFound";
import { WindowTitle } from "@temp/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@temp/config";
import useNavigator from "@temp/hooks/useNavigator";
import useUser from "@temp/hooks/useUser";
import OrderCannotCancelOrderDialog from "@temp/sections/orders/components/OrderCannotCancelOrderDialog";
import useCustomerSearch from "@temp/searches/useCustomerSearch";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import { customerUrl } from "../../../customers/urls";
import {
  getStringOrPlaceholder,
  maybe,
  transformAddressToForm
} from "@temp/misc";
import { productUrl } from "../../../products/urls";
import { OrderStatus } from "@temp/types/globalTypes";
import OrderAddressEditDialog from "../../components/OrderAddressEditDialog";
import OrderCancelDialog from "../../components/OrderCancelDialog";
import OrderDetailsPage from "../../components/OrderDetailsPage";
import OrderDraftCancelDialog from "../../components/OrderDraftCancelDialog/OrderDraftCancelDialog";
import OrderDraftFinalizeDialog, {
  OrderDraftFinalizeWarning
} from "../../components/OrderDraftFinalizeDialog";
import OrderDraftPage from "../../components/OrderDraftPage";
import OrderMarkAsPaidDialog from "../../components/OrderMarkAsPaidDialog/OrderMarkAsPaidDialog";
import OrderPaymentDialog from "../../components/OrderPaymentDialog";
import OrderPaymentVoidDialog from "../../components/OrderPaymentVoidDialog";
import OrderProductAddDialog from "../../components/OrderProductAddDialog";
import OrderShippingMethodEditDialog from "../../components/OrderShippingMethodEditDialog";
import OrderOperations from "../../containers/OrderOperations";
import { TypedOrderDetailsQuery, useOrderVariantSearch } from "../../queries";
import { OrderDetails_order } from "../../types/OrderDetails";
import {
  orderFulfillUrl,
  orderListUrl,
  orderUrl,
  OrderUrlDialog,
  OrderUrlQueryParams
} from "../../urls";
import { OrderDetailsMessages } from "./OrderDetailsMessages";
import OrderFulfillDialog from "@temp/sections/orders/components/OrderFulfillDialog";

const orderDraftFinalizeWarnings = (order: OrderDetails_order) => {
  const warnings = [] as OrderDraftFinalizeWarning[];
  if (!(order && order.shippingAddress)) {
    warnings.push(OrderDraftFinalizeWarning.NO_SHIPPING);
  }
  if (!(order && (order.user || order.userEmail))) {
    warnings.push(OrderDraftFinalizeWarning.NO_USER);
  }
  if (
      order &&
      order.lines &&
      order.lines.filter(line => line.isShippingRequired).length > 0 &&
      order.shippingMethod === null
  ) {
    warnings.push(OrderDraftFinalizeWarning.NO_SHIPPING_METHOD);
  }
  if (
      order &&
      order.lines &&
      order.lines.filter(line => line.isShippingRequired).length === 0 &&
      order.shippingMethod !== null
  ) {
    warnings.push(OrderDraftFinalizeWarning.UNNECESSARY_SHIPPING_METHOD);
  }
  return warnings;
};

interface OrderDetailsProps {
  id: string;
  params: OrderUrlQueryParams;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const { user } = useUser();
  const {
    loadMore: loadMoreCustomers,
    search: searchUsers,
    result: users
  } = useCustomerSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore,
    search: variantSearch,
    result: variantSearchOpts
  } = useOrderVariantSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const intl = useIntl();

  const [openModal, closeModal] = createDialogActionHandlers<
      OrderUrlDialog,
      OrderUrlQueryParams
      >(navigate, params => orderUrl(id, params), params);

  const handleBack = () => navigate(orderListUrl());

  return (
      <TypedOrderDetailsQuery displayLoader variables={{ id }}>
        {({ data, loading }) => {
          const order = data?.order;

          if (order === null) {
            return <NotFoundPage />;
          }

          return (
              <OrderDetailsMessages id={id} params={params}>
                {orderMessages => (
                    <OrderOperations
                        order={id}
                        onNoteAdd={orderMessages.handleNoteAdd}
                        onOrderCancel={orderMessages.handleOrderCancel}
                        onOrderVoid={orderMessages.handleOrderVoid}
                        onPaymentCapture={orderMessages.handlePaymentCapture}
                        onPaymentRefund={orderMessages.handlePaymentRefund}
                        onUpdate={orderMessages.handleUpdate}
                        onDraftUpdate={orderMessages.handleDraftUpdate}
                        onShippingMethodUpdate={
                          orderMessages.handleShippingMethodUpdate
                        }
                        onOrderLineDelete={orderMessages.handleOrderLineDelete}
                        onOrderLinesAdd={orderMessages.handleOrderLinesAdd}
                        onOrderLineUpdate={orderMessages.handleOrderLineUpdate}
                        onDraftFinalize={orderMessages.handleDraftFinalize}
                        onDraftCancel={orderMessages.handleDraftCancel}
                        onOrderMarkAsPaid={orderMessages.handleOrderMarkAsPaid}
                        onFulfillOrder={orderMessages.handleFulfill}
                    >
                      {({
                          orderAddNote,
                          orderCancel,
                          orderDraftUpdate,
                          orderLinesAdd,
                          orderLineDelete,
                          orderLineUpdate,
                          orderPaymentCapture,
                          orderPaymentRefund,
                          orderVoid,
                          orderShippingMethodUpdate,
                          orderUpdate,
                          orderDraftCancel,
                          orderDraftFinalize,
                          orderPaymentMarkAsPaid,
                          orderFulfill
                        }) => (
                          <>
                            {order?.status !== OrderStatus.DRAFT ? (
                                <>
                                  <WindowTitle
                                      title={intl.formatMessage(
                                          {
                                            id: "order{orderNumber}",
                                            defaultMessage: "Order #{orderNumber}",
                                            description: "window title"
                                          },
                                          {
                                            orderNumber: getStringOrPlaceholder(
                                                data?.order?.number
                                            )
                                          }
                                      )}
                                  />
                                  <OrderDetailsPage
                                      onNoteAdd={variables =>
                                          orderAddNote.mutate({
                                            input: variables,
                                            order: id
                                          })
                                      }
                                      onBack={handleBack}
                                      order={order}
                                      shippingMethods={maybe(
                                          () => data.order.availableShippingMethods,
                                          []
                                      )}
                                      userPermissions={user?.userPermissions || []}
                                      onOrderCancel={() => openModal("cancel")}
                                      onOrderFulfill={() => navigate(orderFulfillUrl(id))}
                                      onPaymentCapture={() => openModal("capture")}
                                      onPaymentVoid={() => openModal("void")}
                                      onPaymentRefund={() => openModal("refund")}
                                      onProductClick={id => () => navigate(productUrl(id))}
                                      onShippingAddressEdit={() =>
                                          openModal("edit-shipping-address")
                                      }
                                      onPaymentPaid={() => openModal("mark-paid")}
                                      onProfileView={() =>
                                          navigate(customerUrl(order.user.id))
                                      }
                                      onFulfill={() => openModal("fulfill")}
                                  />
                                  <OrderCannotCancelOrderDialog
                                      onClose={closeModal}
                                      open={params.action === "cancel"}
                                  />
                                  <OrderCancelDialog
                                      confirmButtonState={orderCancel.opts.status}
                                      errors={
                                        orderCancel.opts.data?.orderCancel.errors || []
                                      }
                                      number={order?.number}
                                      open={params.action === "cancel"}
                                      onClose={closeModal}
                                      onSubmit={() =>
                                          orderCancel.mutate({
                                            id
                                          })
                                      }
                                  />
                                  <OrderMarkAsPaidDialog
                                      confirmButtonState={
                                        orderPaymentMarkAsPaid.opts.status
                                      }
                                      errors={
                                        orderPaymentMarkAsPaid.opts.data?.orderMarkAsPaid
                                            .errors || []
                                      }
                                      onClose={closeModal}
                                      onConfirm={() =>
                                          orderPaymentMarkAsPaid.mutate({
                                            id
                                          })
                                      }
                                      open={params.action === "mark-paid"}
                                  />
                                  <OrderPaymentVoidDialog
                                      confirmButtonState={orderVoid.opts.status}
                                      errors={orderVoid.opts.data?.orderVoid.errors || []}
                                      open={params.action === "void"}
                                      onClose={closeModal}
                                      onConfirm={() => orderVoid.mutate({ id })}
                                  />
                                  <OrderPaymentDialog
                                      confirmButtonState={orderPaymentCapture.opts.status}
                                      errors={
                                        orderPaymentCapture.opts.data?.orderCapture
                                            .errors || []
                                      }
                                      initial={order?.total.gross.amount}
                                      open={params.action === "capture"}
                                      variant="capture"
                                      onClose={closeModal}
                                      onSubmit={variables =>
                                          orderPaymentCapture.mutate({
                                            ...variables,
                                            id
                                          })
                                      }
                                  />
                                  <OrderPaymentDialog
                                      confirmButtonState={orderPaymentRefund.opts.status}
                                      errors={
                                        orderPaymentRefund.opts.data?.orderRefund.errors ||
                                        []
                                      }
                                      initial={order?.total.gross.amount}
                                      open={params.action === "refund"}
                                      variant="refund"
                                      onClose={closeModal}
                                      onSubmit={variables =>
                                          orderPaymentRefund.mutate({
                                            ...variables,
                                            id
                                          })
                                      }
                                  />
                                  <OrderFulfillDialog
                                      confirmButtonState={orderFulfill.opts.status}
                                      errors={
                                        orderFulfill.opts.data?.orderFulfill.errors || []
                                      }
                                      number={order?.number}
                                      open={params.action === "fulfill"}
                                      onClose={closeModal}
                                      onSubmit={() =>
                                          orderFulfill.mutate({
                                            orderId: order.id,
                                            input: {
                                              notifyCustomer: false,
                                              lines: order.lines.map(line => ({orderLineId: line.id}))
                                            }
                                          })
                                      }
                                  />
                                </>
                            ) : (
                                <>
                                  <WindowTitle
                                      title={intl.formatMessage(
                                          {
                                            id: "draft_order{orderNumber}",
                                            defaultMessage: "Draft Order #{orderNumber}",
                                            description: "window title"
                                          },
                                          {
                                            orderNumber: getStringOrPlaceholder(
                                                data?.order?.number
                                            )
                                          }
                                      )}
                                  />
                                  <OrderDraftPage
                                      disabled={loading}
                                      onNoteAdd={variables =>
                                          orderAddNote.mutate({
                                            input: variables,
                                            order: id
                                          })
                                      }
                                      users={maybe(
                                          () =>
                                              users.data.search.edges.map(edge => edge.node),
                                          []
                                      )}
                                      hasMore={maybe(
                                          () => users.data.search.pageInfo.hasNextPage,
                                          false
                                      )}
                                      onFetchMore={loadMoreCustomers}
                                      fetchUsers={searchUsers}
                                      loading={users.loading}
                                      usersLoading={users.loading}
                                      onCustomerEdit={data =>
                                          orderDraftUpdate.mutate({
                                            id,
                                            input: data
                                          })
                                      }
                                      onDraftFinalize={() => openModal("finalize")}
                                      onDraftRemove={() => openModal("cancel")}
                                      onOrderLineAdd={() => openModal("add-order-line")}
                                      onBack={() => navigate(orderListUrl())}
                                      order={order}
                                      countries={[]}
                                      // countries={maybe(() => data.shop.countries, []).map(
                                      //   country => ({
                                      //     code: country.code,
                                      //     label: country.country
                                      //   })
                                      // )}
                                      onProductClick={id => () =>
                                          navigate(productUrl(encodeURIComponent(id)))}
                                      onShippingAddressEdit={() =>
                                          openModal("edit-shipping-address")
                                      }
                                      onShippingMethodEdit={() =>
                                          openModal("edit-shipping")
                                      }
                                      onOrderLineRemove={id =>
                                          orderLineDelete.mutate({ id })
                                      }
                                      onOrderLineChange={(id, data) =>
                                          orderLineUpdate.mutate({
                                            id,
                                            input: data
                                          })
                                      }
                                      saveButtonBarState="default"
                                      onProfileView={() =>
                                          navigate(customerUrl(order.user.id))
                                      }
                                      userPermissions={user?.userPermissions || []}
                                  />
                                  <OrderDraftCancelDialog
                                      confirmButtonState={orderDraftCancel.opts.status}
                                      errors={
                                        orderDraftCancel.opts.data?.draftOrderDelete
                                            .errors || []
                                      }
                                      onClose={closeModal}
                                      onConfirm={() => orderDraftCancel.mutate({ id })}
                                      open={params.action === "cancel"}
                                      orderNumber={getStringOrPlaceholder(order?.number)}
                                  />
                                  <OrderDraftFinalizeDialog
                                      confirmButtonState={orderDraftFinalize.opts.status}
                                      errors={
                                        orderDraftFinalize.opts.data?.draftOrderComplete
                                            .errors || []
                                      }
                                      onClose={closeModal}
                                      onConfirm={() => orderDraftFinalize.mutate({ id })}
                                      open={params.action === "finalize"}
                                      orderNumber={getStringOrPlaceholder(order?.number)}
                                      warnings={orderDraftFinalizeWarnings(order)}
                                  />
                                  <OrderShippingMethodEditDialog
                                      confirmButtonState={
                                        orderShippingMethodUpdate.opts.status
                                      }
                                      errors={
                                        orderShippingMethodUpdate.opts.data
                                            ?.orderUpdateShipping.errors || []
                                      }
                                      open={params.action === "edit-shipping"}
                                      shippingMethod={order?.shippingMethod?.id}
                                      shippingMethods={order?.availableShippingMethods}
                                      onClose={closeModal}
                                      onSubmit={variables =>
                                          orderShippingMethodUpdate.mutate({
                                            id,
                                            input: {
                                              shippingMethod: variables.shippingMethod
                                            }
                                          })
                                      }
                                  />
                                  <OrderProductAddDialog
                                      confirmButtonState={orderLinesAdd.opts.status}
                                      errors={
                                        orderLinesAdd.opts.data?.draftOrderLinesCreate
                                            .errors || []
                                      }
                                      loading={variantSearchOpts.loading}
                                      open={params.action === "add-order-line"}
                                      hasMore={
                                        variantSearchOpts.data?.search.pageInfo.hasNextPage
                                      }
                                      products={variantSearchOpts.data?.search.edges.map(
                                          edge => edge.node
                                      )}
                                      onClose={closeModal}
                                      onFetch={variantSearch}
                                      onFetchMore={loadMore}
                                      onSubmit={variants =>
                                          orderLinesAdd.mutate({
                                            id,
                                            input: variants.map(variant => ({
                                              quantity: 1,
                                              variantId: variant.id
                                            }))
                                          })
                                      }
                                  />
                                </>
                            )}
                            <OrderAddressEditDialog
                                confirmButtonState={orderUpdate.opts.status}
                                address={transformAddressToForm(order?.shippingAddress)}
                                countries={[]}
                                // countries={
                                //   data?.shop?.countries.map(country => ({
                                //     code: country.code,
                                //     label: country.country
                                //   })) || []
                                // }
                                errors={orderUpdate.opts.data?.orderUpdate.errors || []}
                                open={params.action === "edit-shipping-address"}
                                onClose={closeModal}
                                onConfirm={shippingAddress =>
                                    orderUpdate.mutate({
                                      id,
                                      input: {
                                        shippingAddress
                                      }
                                    })
                                }
                            />
                          </>
                      )}
                    </OrderOperations>
                )}
              </OrderDetailsMessages>
          );
        }}
      </TypedOrderDetailsQuery>
  );
};

export default OrderDetails;
