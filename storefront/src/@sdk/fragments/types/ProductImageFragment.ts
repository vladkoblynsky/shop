/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductImageFragment
// ====================================================

export interface ProductImageFragment {
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
  /**
   * The thumbnail image.
   */
  largeThumbnail: string | null;
  /**
   * The thumbnail image.
   */
  smallThumbnail: string | null;
}
