/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountAddressUpdate
// ====================================================

export interface AccountAddressUpdate_accountAddressUpdate_accountErrors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface AccountAddressUpdate_accountAddressUpdate_user_defaultShippingAddress_country {
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

export interface AccountAddressUpdate_accountAddressUpdate_user_defaultShippingAddress {
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
  country: AccountAddressUpdate_accountAddressUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressUpdate_accountAddressUpdate_user_addresses_country {
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

export interface AccountAddressUpdate_accountAddressUpdate_user_addresses {
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
  country: AccountAddressUpdate_accountAddressUpdate_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressUpdate_accountAddressUpdate_user {
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
  defaultShippingAddress: AccountAddressUpdate_accountAddressUpdate_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountAddressUpdate_accountAddressUpdate_user_addresses | null)[] | null;
}

export interface AccountAddressUpdate_accountAddressUpdate_address_country {
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

export interface AccountAddressUpdate_accountAddressUpdate_address {
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
  country: AccountAddressUpdate_accountAddressUpdate_address_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressUpdate_accountAddressUpdate {
  __typename: "AccountAddressUpdate";
  accountErrors: AccountAddressUpdate_accountAddressUpdate_accountErrors[];
  /**
   * A user object for which the address was edited.
   */
  user: AccountAddressUpdate_accountAddressUpdate_user | null;
  address: AccountAddressUpdate_accountAddressUpdate_address | null;
}

export interface AccountAddressUpdate {
  /**
   * Updates an address of the logged-in user.
   */
  accountAddressUpdate: AccountAddressUpdate_accountAddressUpdate | null;
}

export interface AccountAddressUpdateVariables {
  id: string;
  input: AddressInput;
}
