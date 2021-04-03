/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ExportObjBulkDelete
// ====================================================

export interface ExportObjBulkDelete_exportObjBulkDelete_productErrors {
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

export interface ExportObjBulkDelete_exportObjBulkDelete {
  __typename: "ExportObjBulkDelete";
  productErrors: ExportObjBulkDelete_exportObjBulkDelete_productErrors[];
  /**
   * Returns how many objects were affected.
   */
  count: number;
}

export interface ExportObjBulkDelete {
  /**
   * Delete export objects.
   */
  exportObjBulkDelete: ExportObjBulkDelete_exportObjBulkDelete | null;
}

export interface ExportObjBulkDeleteVariables {
  ids: (string | null)[];
}
