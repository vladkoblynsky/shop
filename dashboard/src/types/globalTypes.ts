/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum AccountErrorCode {
  ACTIVATE_OWN_ACCOUNT = "ACTIVATE_OWN_ACCOUNT",
  ACTIVATE_SUPERUSER_ACCOUNT = "ACTIVATE_SUPERUSER_ACCOUNT",
  ASSIGN_NON_STAFF_MEMBER = "ASSIGN_NON_STAFF_MEMBER",
  DEACTIVATE_OWN_ACCOUNT = "DEACTIVATE_OWN_ACCOUNT",
  DEACTIVATE_SUPERUSER_ACCOUNT = "DEACTIVATE_SUPERUSER_ACCOUNT",
  DELETE_NON_STAFF_USER = "DELETE_NON_STAFF_USER",
  DELETE_OWN_ACCOUNT = "DELETE_OWN_ACCOUNT",
  DELETE_STAFF_ACCOUNT = "DELETE_STAFF_ACCOUNT",
  DELETE_SUPERUSER_ACCOUNT = "DELETE_SUPERUSER_ACCOUNT",
  GRAPHQL_ERROR = "GRAPHQL_ERROR",
  INVALID = "INVALID",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  NOT_FOUND = "NOT_FOUND",
  PASSWORD_ENTIRELY_NUMERIC = "PASSWORD_ENTIRELY_NUMERIC",
  PASSWORD_TOO_COMMON = "PASSWORD_TOO_COMMON",
  PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_SIMILAR = "PASSWORD_TOO_SIMILAR",
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
}

/**
 * An enumeration.
 */
export enum AttributeInputTypeEnum {
  DROPDOWN = "DROPDOWN",
  MULTISELECT = "MULTISELECT",
}

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * An enumeration.
 */
export enum PermissionEnum {
  MANAGE_APPS = "MANAGE_APPS",
  MANAGE_CHECKOUTS = "MANAGE_CHECKOUTS",
  MANAGE_DISCOUNTS = "MANAGE_DISCOUNTS",
  MANAGE_GIFT_CARD = "MANAGE_GIFT_CARD",
  MANAGE_MENUS = "MANAGE_MENUS",
  MANAGE_ORDERS = "MANAGE_ORDERS",
  MANAGE_PAGES = "MANAGE_PAGES",
  MANAGE_PLUGINS = "MANAGE_PLUGINS",
  MANAGE_PRODUCTS = "MANAGE_PRODUCTS",
  MANAGE_SETTINGS = "MANAGE_SETTINGS",
  MANAGE_SHIPPING = "MANAGE_SHIPPING",
  MANAGE_STAFF = "MANAGE_STAFF",
  MANAGE_TRANSLATIONS = "MANAGE_TRANSLATIONS",
  MANAGE_USERS = "MANAGE_USERS",
  MANAGE_WEBHOOKS = "MANAGE_WEBHOOKS",
}

export enum ProductOrderField {
  DATE = "DATE",
  NAME = "NAME",
  PUBLISHED = "PUBLISHED",
  TYPE = "TYPE",
}

export interface AttributeInput {
  slug: string;
  values?: (string | null)[] | null;
}

export interface PriceRangeInput {
  gte?: number | null;
  lte?: number | null;
}

export interface ProductFilterInput {
  isPublished?: boolean | null;
  productType?: string | null;
  search?: string | null;
  productTypes?: (string | null)[] | null;
  categories?: (string | null)[] | null;
  attributes?: (AttributeInput | null)[] | null;
  price?: PriceRangeInput | null;
}

export interface ProductOrder {
  direction: OrderDirection;
  attributeId?: string | null;
  field?: ProductOrderField | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
