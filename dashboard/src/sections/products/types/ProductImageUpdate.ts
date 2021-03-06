/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductImageUpdate
// ====================================================

export interface ProductImageUpdate_productImageUpdate_errors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ProductImageUpdate_productImageUpdate_product_attributes_attribute_values {
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

export interface ProductImageUpdate_productImageUpdate_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (ProductImageUpdate_productImageUpdate_product_attributes_attribute_values | null)[] | null;
}

export interface ProductImageUpdate_productImageUpdate_product_attributes_values {
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

export interface ProductImageUpdate_productImageUpdate_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductImageUpdate_productImageUpdate_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductImageUpdate_productImageUpdate_product_attributes_values | null)[];
}

export interface ProductImageUpdate_productImageUpdate_product_productType_variantAttributes_values {
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

export interface ProductImageUpdate_productImageUpdate_product_productType_variantAttributes {
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
   * List of attribute's values.
   */
  values: (ProductImageUpdate_productImageUpdate_product_productType_variantAttributes_values | null)[] | null;
}

export interface ProductImageUpdate_productImageUpdate_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductImageUpdate_productImageUpdate_product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
}

export interface ProductImageUpdate_productImageUpdate_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductImageUpdate_productImageUpdate_product_minimalVariantPrice {
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

export interface ProductImageUpdate_productImageUpdate_product_priceRange_start {
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

export interface ProductImageUpdate_productImageUpdate_product_priceRange_stop {
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

export interface ProductImageUpdate_productImageUpdate_product_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductImageUpdate_productImageUpdate_product_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductImageUpdate_productImageUpdate_product_priceRange_stop | null;
}

export interface ProductImageUpdate_productImageUpdate_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductImageUpdate_productImageUpdate_product_variants_priceOverride {
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

export interface ProductImageUpdate_productImageUpdate_product_variants_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface ProductImageUpdate_productImageUpdate_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: ProductImageUpdate_productImageUpdate_product_variants_priceOverride | null;
  /**
   * Stocks for the product variant.
   */
  stocks: (ProductImageUpdate_productImageUpdate_product_variants_stocks | null)[] | null;
}

export interface ProductImageUpdate_productImageUpdate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductImageUpdate_productImageUpdate_product_attributes[];
  productType: ProductImageUpdate_productImageUpdate_product_productType;
  name: string;
  slug: string;
  unit: string | null;
  descriptionJson: any;
  description: string;
  category: ProductImageUpdate_productImageUpdate_product_category | null;
  minimalVariantPrice: ProductImageUpdate_productImageUpdate_product_minimalVariantPrice | null;
  /**
   * Product price range
   */
  priceRange: ProductImageUpdate_productImageUpdate_product_priceRange | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isPublished: boolean;
  /**
   * List of images for the product.
   */
  images: (ProductImageUpdate_productImageUpdate_product_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductImageUpdate_productImageUpdate_product_variants | null)[] | null;
}

export interface ProductImageUpdate_productImageUpdate {
  __typename: "ProductImageUpdate";
  errors: ProductImageUpdate_productImageUpdate_errors[];
  product: ProductImageUpdate_productImageUpdate_product | null;
}

export interface ProductImageUpdate {
  /**
   * Updates a product image.
   */
  productImageUpdate: ProductImageUpdate_productImageUpdate | null;
}

export interface ProductImageUpdateVariables {
  id: string;
  alt: string;
}
