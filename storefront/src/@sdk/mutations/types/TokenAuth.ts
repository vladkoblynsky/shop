/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_accountErrors {
  __typename: "AccountError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface TokenAuth_tokenCreate_user_defaultShippingAddress_country {
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

export interface TokenAuth_tokenCreate_user_defaultShippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: TokenAuth_tokenCreate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface TokenAuth_tokenCreate_user_addresses_country {
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

export interface TokenAuth_tokenCreate_user_addresses {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: TokenAuth_tokenCreate_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  defaultShippingAddress: TokenAuth_tokenCreate_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (TokenAuth_tokenCreate_user_addresses | null)[] | null;
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  token: string | null;
  /**
   * List of errorsAddressCreate that occurred executing the mutation.
   */
  accountErrors: TokenAuth_tokenCreate_accountErrors[];
  /**
   * A user instance.
   */
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  /**
   * Mutation that authenticates a user and returns token and user data.
   * It overrides the default graphql_jwt.ObtainJSONWebToken to wrap potential
   * authentication errorsAddressCreate in our Error type, which is consistent to how the rest of
   * the mutation works.
   */
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
