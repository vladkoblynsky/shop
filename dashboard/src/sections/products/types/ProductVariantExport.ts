/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FileFormatEnum, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantExport
// ====================================================

export interface ProductVariantExport_productVariantExport_productErrors {
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

export interface ProductVariantExport_productVariantExport {
  __typename: "ProductVariantExport";
  productErrors: ProductVariantExport_productVariantExport_productErrors[];
  url: string | null;
}

export interface ProductVariantExport {
  /**
   * Export product variants.
   */
  productVariantExport: ProductVariantExport_productVariantExport | null;
}

export interface ProductVariantExportVariables {
  fileFormat?: FileFormatEnum | null;
}
