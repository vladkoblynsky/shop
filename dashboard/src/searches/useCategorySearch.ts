import makeTopLevelSearch from "@temp/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@temp/queries";
import { gql } from "@apollo/client";

import {
  SearchCategories,
  SearchCategoriesVariables
} from "./types/SearchCategories";

export const searchCategories = gql`
  ${pageInfoFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchCategories, SearchCategoriesVariables>(
  searchCategories
);
