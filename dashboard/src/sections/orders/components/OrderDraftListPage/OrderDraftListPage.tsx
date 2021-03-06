import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@temp/components/Container";
import FilterBar from "@temp/components/FilterBar";
import PageHeader from "@temp/components/PageHeader";
import { sectionNames } from "@temp/intl";
import { OrderDraftListUrlSortField } from "@temp/sections/orders/urls";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@temp/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { OrderDraftList_draftOrders_edges_node } from "../../types/OrderDraftList";
import OrderDraftList from "../OrderDraftList";
import {
  // createFilterStructure,
  OrderDraftFilterKeys,
  OrderDraftListFilterOpts
} from "./filters";

export interface OrderDraftListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<OrderDraftFilterKeys, OrderDraftListFilterOpts>,
    SortPage<OrderDraftListUrlSortField>,
    TabPageProps {
  orders: OrderDraftList_draftOrders_edges_node[];
}

const OrderDraftListPage: React.FC<OrderDraftListPageProps> = ({
  currencySymbol,
  currentTab,
  disabled,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
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
      <PageHeader title={intl.formatMessage(sectionNames.draftOrders)}>
        <Button
          color="primary"
          variant="contained"
          disabled={disabled}
          onClick={onAdd}
        >
          <FormattedMessage id="create_order"
            defaultMessage="Create order"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({id: "all_drafts",
            defaultMessage: "All Drafts",
            description: "tab name"
          })}
          // currencySymbol={currencySymbol}
          currentTab={currentTab}
          // filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({id: "search_draft",
            defaultMessage: "Search Draft"
          })}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <OrderDraftList disabled={disabled} {...listProps} />
      </Card>
    </Container>
  );
};
OrderDraftListPage.displayName = "OrderDraftListPage";
export default OrderDraftListPage;
