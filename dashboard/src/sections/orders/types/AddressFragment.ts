/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AddressFragment
// ====================================================

export interface AddressFragment_country {
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

export interface AddressFragment {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AddressFragment_country;
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
