/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode, ExportObjStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ExportObjDelete
// ====================================================

export interface ExportObjDelete_exportObjDelete_productErrors {
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

export interface ExportObjDelete_exportObjDelete_exportObj {
  __typename: "ExportObjType";
  /**
   * The ID of the object.
   */
  id: string;
  created: any;
  fileName: string | null;
  fileUrl: string;
  status: ExportObjStatus;
  storageUrl: string | null;
}

export interface ExportObjDelete_exportObjDelete {
  __typename: "ExportObjDelete";
  productErrors: ExportObjDelete_exportObjDelete_productErrors[];
  exportObj: ExportObjDelete_exportObjDelete_exportObj | null;
}

export interface ExportObjDelete {
  /**
   * Deletes an export object.
   */
  exportObjDelete: ExportObjDelete_exportObjDelete | null;
}

export interface ExportObjDeleteVariables {
  id: string;
}
