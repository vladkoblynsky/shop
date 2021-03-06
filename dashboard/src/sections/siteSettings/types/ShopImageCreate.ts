/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopErrorCode, AuthorizationKeyType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ShopImageCreate
// ====================================================

export interface ShopImageCreate_shopImageCreate_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface ShopImageCreate_shopImageCreate_shop_authorizationKeys {
  __typename: "AuthorizationKey";
  /**
   * Authorization key (client ID).
   */
  key: string;
  /**
   * Name of the authorization backend.
   */
  name: AuthorizationKeyType;
}

export interface ShopImageCreate_shopImageCreate_shop_companyAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShopImageCreate_shopImageCreate_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: ShopImageCreate_shopImageCreate_shop_companyAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface ShopImageCreate_shopImageCreate_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface ShopImageCreate_shopImageCreate_shop_images {
  __typename: "SiteBannerImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  description: string;
  /**
   * The URL of the image.
   */
  url: string;
  sortOrder: number | null;
}

export interface ShopImageCreate_shopImageCreate_shop {
  __typename: "Shop";
  /**
   * List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google).
   */
  authorizationKeys: (ShopImageCreate_shopImageCreate_shop_authorizationKeys | null)[];
  /**
   * Company address.
   */
  companyAddress: ShopImageCreate_shopImageCreate_shop_companyAddress | null;
  /**
   * URL of a view where customers can set their password.
   */
  customerSetPasswordUrl: string | null;
  /**
   * Default shop's email sender's address.
   */
  defaultMailSenderAddress: string | null;
  /**
   * Default shop's email sender's name.
   */
  defaultMailSenderName: string | null;
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Header text.
   */
  headerText: string | null;
  /**
   * Shop's domain data.
   */
  domain: ShopImageCreate_shopImageCreate_shop_domain;
  /**
   * List of images for the site.
   */
  images: (ShopImageCreate_shopImageCreate_shop_images | null)[] | null;
}

export interface ShopImageCreate_shopImageCreate {
  __typename: "ShopImageCreate";
  errors: ShopImageCreate_shopImageCreate_errors[];
  shop: ShopImageCreate_shopImageCreate_shop | null;
}

export interface ShopImageCreate {
  /**
   * Create a site image. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https: // github.com/jaydenseric/graphql-multipart-request-spec
   */
  shopImageCreate: ShopImageCreate_shopImageCreate | null;
}

export interface ShopImageCreateVariables {
  description?: string | null;
  image: any;
  alt?: string | null;
}
