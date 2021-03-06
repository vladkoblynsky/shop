/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageDetails
// ====================================================

export interface PageDetails_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  content: string;
  contentJson: any;
  publicationDate: any | null;
}

export interface PageDetails {
  /**
   * Look up a page by ID or slug.
   */
  page: PageDetails_page | null;
}

export interface PageDetailsVariables {
  id: string;
}
