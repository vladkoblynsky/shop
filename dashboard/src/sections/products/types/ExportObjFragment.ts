/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExportObjStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ExportObjFragment
// ====================================================

export interface ExportObjFragment {
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
