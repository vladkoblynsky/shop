import makeTopLevelSearch from "@temp/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@temp/queries";
import {gql} from "@apollo/client";

import {
  SearchCustomers,
  SearchCustomersVariables
} from "./types/SearchCustomers";

export const searchCustomers = gql`
  ${pageInfoFragment}
  query SearchCustomers($after: String, $first: Int!, $query: String!) {
    search: customers(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          id
          email
          firstName
          lastName
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchCustomers, SearchCustomersVariables>(
  searchCustomers
);
