/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleInput, BlogErrorCode, BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBlogArticle
// ====================================================

export interface CreateBlogArticle_blogArticleCreate_errors {
  __typename: "BlogError";
  /**
   * The error code.
   */
  code: BlogErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CreateBlogArticle_blogArticleCreate_blogArticle_thumbnail {
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

export interface CreateBlogArticle_blogArticleCreate_blogArticle_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateBlogArticle_blogArticleCreate_blogArticle {
  __typename: "BlogArticleType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  keywords: string;
  tags: string;
  status: BlogArticleStatus;
  body: string;
  isPublished: boolean;
  dateAdded: any;
  datePublished: any | null;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: CreateBlogArticle_blogArticleCreate_blogArticle_thumbnail | null;
  category: CreateBlogArticle_blogArticleCreate_blogArticle_category;
}

export interface CreateBlogArticle_blogArticleCreate {
  __typename: "BlogArticleCreate";
  errors: CreateBlogArticle_blogArticleCreate_errors[];
  blogArticle: CreateBlogArticle_blogArticleCreate_blogArticle | null;
}

export interface CreateBlogArticle {
  /**
   * Creates a new blog article.
   */
  blogArticleCreate: CreateBlogArticle_blogArticleCreate | null;
}

export interface CreateBlogArticleVariables {
  input: BlogArticleInput;
}
