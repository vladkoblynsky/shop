import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import AppHeader from "@temp/components/AppHeader";
import { Container } from "@temp/components/Container";
import FilterBar from "@temp/components/FilterBar";
import PageHeader from "@temp/components/PageHeader";
import { sectionNames } from "@temp/intl";
import { StaffListUrlSortField } from "@temp/sections/staff/urls";
import {
  FilterPageProps,
  ListProps,
  SortPage,
  TabPageProps
} from "@temp/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { StaffList_staffUsers_edges_node } from "../../types/StaffList";
import StaffList from "../StaffList/StaffList";
import {
  // createFilterStructure,
  StaffFilterKeys,
  StaffListFilterOpts
} from "./filters";

export interface StaffListPageProps
  extends ListProps,
    FilterPageProps<StaffFilterKeys, StaffListFilterOpts>,
    SortPage<StaffListUrlSortField>,
    TabPageProps {
  staffMembers: StaffList_staffUsers_edges_node[];
  onAdd: () => void;
  onBack: () => void;
}

const StaffListPage: React.FC<StaffListPageProps> = ({
  currencySymbol,
  currentTab,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onBack,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const intl = useIntl();

  // const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.staff)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage id="invite_staff_member"
            defaultMessage="Invite staff member"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({id: "all_staff_members",
            defaultMessage: "All Staff Members",
            description: "tab name"
          })}
          // currencySymbol={currencySymbol}
          currentTab={currentTab}
          // filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({id: "search_staff_member",
            defaultMessage: "Search Staff Member"
          })}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <StaffList {...listProps} />
      </Card>
    </Container>
  );
};
StaffListPage.displayName = "StaffListPage";
export default StaffListPage;
