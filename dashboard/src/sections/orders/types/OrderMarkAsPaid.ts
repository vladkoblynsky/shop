/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderErrorCode, OrderEventsEmailsEnum, OrderEventsEnum, PaymentChargeStatusEnum, OrderStatus, OrderAction } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderMarkAsPaid
// ====================================================

export interface OrderMarkAsPaid_orderMarkAsPaid_errors {
  __typename: "OrderError";
  /**
   * The error code.
   */
  code: OrderErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_events_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_events {
  __typename: "OrderEvent";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Amount of money.
   */
  amount: number | null;
  /**
   * Date when event happened at in ISO 8601 format.
   */
  date: any | null;
  /**
   * Email of the customer.
   */
  email: string | null;
  /**
   * Type of an email sent to the customer.
   */
  emailType: OrderEventsEmailsEnum | null;
  /**
   * Content of the event.
   */
  message: string | null;
  /**
   * Number of items.
   */
  quantity: number | null;
  /**
   * Order event type.
   */
  type: OrderEventsEnum | null;
  /**
   * User who performed the action.
   */
  user: OrderMarkAsPaid_orderMarkAsPaid_order_events_user | null;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice_net;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_lines_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderMarkAsPaid_orderMarkAsPaid_order_lines_unitPrice | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderMarkAsPaid_orderMarkAsPaid_order_lines_thumbnail | null;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: OrderMarkAsPaid_orderMarkAsPaid_order_shippingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderMarkAsPaid_orderMarkAsPaid_order_shippingPrice_gross;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_subtotal_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderMarkAsPaid_orderMarkAsPaid_order_subtotal_gross;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_total_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderMarkAsPaid_orderMarkAsPaid_order_total_gross;
  /**
   * Amount of taxes.
   */
  tax: OrderMarkAsPaid_orderMarkAsPaid_order_total_tax;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_totalAuthorized {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_totalCaptured {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_availableShippingMethods_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: OrderMarkAsPaid_orderMarkAsPaid_order_availableShippingMethods_price | null;
}

export interface OrderMarkAsPaid_orderMarkAsPaid_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Informs whether a draft order can be finalized(turned into a regular order).
   */
  canFinalize: boolean;
  created: any;
  customerNote: string;
  /**
   * List of events associated with the order.
   */
  events: (OrderMarkAsPaid_orderMarkAsPaid_order_events | null)[] | null;
  /**
   * List of order lines.
   */
  lines: (OrderMarkAsPaid_orderMarkAsPaid_order_lines | null)[];
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  shippingAddress: OrderMarkAsPaid_orderMarkAsPaid_order_shippingAddress | null;
  shippingMethod: OrderMarkAsPaid_orderMarkAsPaid_order_shippingMethod | null;
  shippingMethodName: string | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: OrderMarkAsPaid_orderMarkAsPaid_order_shippingPrice | null;
  status: OrderStatus;
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: OrderMarkAsPaid_orderMarkAsPaid_order_subtotal | null;
  /**
   * Total amount of the order.
   */
  total: OrderMarkAsPaid_orderMarkAsPaid_order_total | null;
  /**
   * List of actions that can be performed in the current state of an order.
   */
  actions: (OrderAction | null)[];
  /**
   * Amount authorized for the order.
   */
  totalAuthorized: OrderMarkAsPaid_orderMarkAsPaid_order_totalAuthorized | null;
  /**
   * Amount captured by payment.
   */
  totalCaptured: OrderMarkAsPaid_orderMarkAsPaid_order_totalCaptured | null;
  user: OrderMarkAsPaid_orderMarkAsPaid_order_user | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (OrderMarkAsPaid_orderMarkAsPaid_order_availableShippingMethods | null)[] | null;
}

export interface OrderMarkAsPaid_orderMarkAsPaid {
  __typename: "OrderMarkAsPaid";
  errors: OrderMarkAsPaid_orderMarkAsPaid_errors[];
  /**
   * Order marked as paid.
   */
  order: OrderMarkAsPaid_orderMarkAsPaid_order | null;
}

export interface OrderMarkAsPaid {
  /**
   * Mark order as manually paid.
   */
  orderMarkAsPaid: OrderMarkAsPaid_orderMarkAsPaid | null;
}

export interface OrderMarkAsPaidVariables {
  id: string;
}
