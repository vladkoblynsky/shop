import makeQuery from "@temp/hooks/makeQuery";
import { staffMemberFragment } from "@temp/sections/staff/queries";
import {gql} from "@apollo/client";

import { pageInfoFragment } from "@temp/queries";
import {
  PermissionGroupDetails,
  PermissionGroupDetailsVariables
} from "./types/PermissionGroupDetails";
import {
  PermissionGroupList,
  PermissionGroupListVariables
} from "./types/PermissionGroupList";
export const permissionGroupFragment = gql`
  fragment PermissionGroupFragment on Group {
    id
    name
    userCanManage
    users {
      id
      firstName
      lastName
    }
  }
`;

export const permissionFragment = gql`
  fragment PermissionFragment on Permission {
    code
    name
  }
`;

export const permissionGroupDetailsFragment = gql`
  ${permissionGroupFragment}
  ${permissionFragment}
  ${staffMemberFragment}
  fragment PermissionGroupDetailsFragment on Group {
    ...PermissionGroupFragment
    permissions {
      ...PermissionFragment
    }
    users {
      ...StaffMemberFragment
    }
  }
`;

export const permissionGroupListQuery = gql`
  ${pageInfoFragment}
  ${permissionGroupFragment}
  query PermissionGroupList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: PermissionGroupFilterInput
    $sort: PermissionGroupSortingInput
  ) {
    permissionGroups(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...PermissionGroupFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const usePermissionGroupListQuery = makeQuery<
  PermissionGroupList,
  PermissionGroupListVariables
>(permissionGroupListQuery);

export const permissionGroupDetailsQuery = gql`
  ${permissionGroupDetailsFragment}
  query PermissionGroupDetails($id: ID!, $userId: ID!) {
    permissionGroup(id: $id) {
      ...PermissionGroupDetailsFragment
    }
    user(id: $userId) {
      editableGroups {
        id
      }
      userPermissions {
        code
        sourcePermissionGroups(userId: $userId) {
          id
        }
      }
    }
  }
`;
export const usePermissionGroupDetailsQuery = makeQuery<
  PermissionGroupDetails,
  PermissionGroupDetailsVariables
>(permissionGroupDetailsQuery);
