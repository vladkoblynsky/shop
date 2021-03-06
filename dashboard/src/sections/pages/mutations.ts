import {gql} from "@apollo/client";

import { TypedMutation } from "@temp/mutations";
import { pageDetailsFragment } from "./queries";
import {
  PageBulkPublish,
  PageBulkPublishVariables
} from "./types/PageBulkPublish";
import {
  PageBulkRemove,
  PageBulkRemoveVariables
} from "./types/PageBulkRemove";
import { PageCreate, PageCreateVariables } from "./types/PageCreate";
import { PageRemove, PageRemoveVariables } from "./types/PageRemove";
import { PageUpdate, PageUpdateVariables } from "./types/PageUpdate";

const pageErrorFragment = gql`
  fragment PageErrorFragment on PageError {
    code
    field
  }
`;

const pageCreate = gql`
  ${pageDetailsFragment}
  ${pageErrorFragment}
  mutation PageCreate($input: PageInput!) {
    pageCreate(input: $input) {
      errors: pageErrors {
        ...PageErrorFragment
      }
      page {
        ...PageDetailsFragment
      }
    }
  }
`;
export const TypedPageCreate = TypedMutation<PageCreate, PageCreateVariables>(
  pageCreate
);

const pageUpdate = gql`
  ${pageDetailsFragment}
  ${pageErrorFragment}
  mutation PageUpdate($id: ID!, $input: PageInput!) {
    pageUpdate(id: $id, input: $input) {
      errors: pageErrors {
        ...PageErrorFragment
      }
      page {
        ...PageDetailsFragment
      }
    }
  }
`;
export const TypedPageUpdate = TypedMutation<PageUpdate, PageUpdateVariables>(
  pageUpdate
);

const pageRemove = gql`
  ${pageErrorFragment}
  mutation PageRemove($id: ID!) {
    pageDelete(id: $id) {
      errors: pageErrors {
        ...PageErrorFragment
      }
    }
  }
`;
export const TypedPageRemove = TypedMutation<PageRemove, PageRemoveVariables>(
  pageRemove
);

const pageBulkPublish = gql`
  mutation PageBulkPublish($ids: [ID]!, $isPublished: Boolean!) {
    pageBulkPublish(ids: $ids, isPublished: $isPublished) {
      pageErrors {
        code
        field
        message
      }
    }
  }
`;
export const TypedPageBulkPublish = TypedMutation<
  PageBulkPublish,
  PageBulkPublishVariables
>(pageBulkPublish);

const pageBulkRemove = gql`
  mutation PageBulkRemove($ids: [ID]!) {
    pageBulkDelete(ids: $ids) {
       pageErrors{
         code
         field
         message
       }
      count
    }
  }
`;
export const TypedPageBulkRemove = TypedMutation<
  PageBulkRemove,
  PageBulkRemoveVariables
>(pageBulkRemove);
