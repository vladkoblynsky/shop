/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, PaymentChargeStatusEnum, ShippingMethodTypeEnum, AttributeInputTypeEnum, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Order
// ====================================================

export interface Order_orderByToken_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_shippingPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_shippingPrice_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Order_orderByToken_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: Order_orderByToken_shippingPrice_net;
  /**
   * Amount of taxes.
   */
  tax: Order_orderByToken_shippingPrice_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Order_orderByToken_payments_paymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  baseUrl: string | null;
  description: string;
}

export interface Order_orderByToken_payments {
  __typename: "Payment";
  paymentMethod: Order_orderByToken_payments_paymentMethod | null;
}

export interface Order_orderByToken_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_total_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_total_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Order_orderByToken_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: Order_orderByToken_total_net;
  /**
   * Amount of taxes.
   */
  tax: Order_orderByToken_total_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Order_orderByToken_shippingAddress_country {
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

export interface Order_orderByToken_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: Order_orderByToken_shippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface Order_orderByToken_shippingMethod_price {
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

export interface Order_orderByToken_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
  price: Order_orderByToken_shippingMethod_price | null;
}

export interface Order_orderByToken_lines_thumbnail {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Order_orderByToken_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_lines_unitPrice_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Order_orderByToken_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: Order_orderByToken_lines_unitPrice_net;
  /**
   * Amount of taxes.
   */
  tax: Order_orderByToken_lines_unitPrice_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Order_orderByToken_lines_variant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
}

export interface Order_orderByToken_lines_variant_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface Order_orderByToken_lines_variant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface Order_orderByToken_lines_variant_weight {
  __typename: "Weight";
  /**
   * Weight value.
   */
  value: number;
  /**
   * Weight unit.
   */
  unit: string;
}

export interface Order_orderByToken_lines_variant_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Order_orderByToken_lines_variant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * List of attribute's values.
   */
  values: (Order_orderByToken_lines_variant_attributes_attribute_values | null)[] | null;
}

export interface Order_orderByToken_lines_variant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Order_orderByToken_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: Order_orderByToken_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (Order_orderByToken_lines_variant_attributes_values | null)[];
}

export interface Order_orderByToken_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface Order_orderByToken_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (Order_orderByToken_lines_variant_stocks | null)[] | null;
  /**
   * Override the base price of a product.
   */
  price: Order_orderByToken_lines_variant_price | null;
  /**
   * List of images for the product variant.
   */
  images: (Order_orderByToken_lines_variant_images | null)[] | null;
  weight: Order_orderByToken_lines_variant_weight | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: Order_orderByToken_lines_variant_attributes[];
  product: Order_orderByToken_lines_variant_product;
}

export interface Order_orderByToken_lines_productreview {
  __typename: "ProductReview";
  /**
   * The ID of the object.
   */
  id: string;
  content: string;
  rating: ProductReviewRating;
  title: string;
  status: ProductReviewStatus;
  createdAt: any;
  updatedAt: any;
  advantages: any;
  flaws: any;
  userName: string | null;
  /**
   * The URL of the image.
   */
  userAvatar: string | null;
}

export interface Order_orderByToken_lines {
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
  variantName: string;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: Order_orderByToken_lines_thumbnail | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: Order_orderByToken_lines_unitPrice | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: Order_orderByToken_lines_variant | null;
  productreview: Order_orderByToken_lines_productreview | null;
}

export interface Order_orderByToken {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean | null;
  status: OrderStatus;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  created: any;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  shippingMethodName: string | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: Order_orderByToken_shippingPrice | null;
  /**
   * List of payments for the order.
   */
  payments: (Order_orderByToken_payments | null)[] | null;
  /**
   * Total amount of the order.
   */
  total: Order_orderByToken_total | null;
  shippingAddress: Order_orderByToken_shippingAddress | null;
  shippingMethod: Order_orderByToken_shippingMethod | null;
  /**
   * List of order lines.
   */
  lines: (Order_orderByToken_lines | null)[];
}

export interface Order {
  /**
   * Look up an order by token.
   */
  orderByToken: Order_orderByToken | null;
}

export interface OrderVariables {
  token: any;
}
