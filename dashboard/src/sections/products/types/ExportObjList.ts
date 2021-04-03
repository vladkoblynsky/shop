/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExportObjFilterInput, ExportObjOrder, ExportObjStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ExportObjList
// ====================================================

export interface ExportObjList_exportObjList_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ExportObjList_exportObjList_edges_node {
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

export interface ExportObjList_exportObjList_edges {
  __typename: "ExportObjTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ExportObjList_exportObjList_edges_node;
}

export interface ExportObjList_exportObjList {
  __typename: "ExportObjTypeCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ExportObjList_exportObjList_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: ExportObjList_exportObjList_edges[];
}

export interface ExportObjList {
  /**
   * List of the shop's export objects.
   */
  exportObjList: ExportObjList_exportObjList | null;
}

export interface ExportObjListVariables {
  first?: number | null;
  filter?: ExportObjFilterInput | null;
  sortBy?: ExportObjOrder | null;
  after?: string | null;
  before?: string | null;
}
