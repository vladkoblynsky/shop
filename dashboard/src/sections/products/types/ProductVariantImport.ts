/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantImport
// ====================================================

export interface ProductVariantImport_productVariantImport_productErrors {
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

export interface ProductVariantImport_productVariantImport {
  __typename: "ProductVariantImport";
  productErrors: ProductVariantImport_productVariantImport_productErrors[];
}

export interface ProductVariantImport {
  /**
   * Import product variants from file
   */
  productVariantImport: ProductVariantImport_productVariantImport | null;
}

export interface ProductVariantImportVariables {
  file: any;
}
