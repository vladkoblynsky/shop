import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import AppHeader from "@temp/components/AppHeader";
import Container from "@temp/components/Container";
import FilterBar from "@temp/components/FilterBar";
import PageHeader from "@temp/components/PageHeader";
import { sectionNames } from "@temp/intl";
import { ProductTypeListUrlSortField } from "@temp/sections/productTypes/urls";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@temp/types";
import { ProductTypeList_productTypes_edges_node } from "../../types/ProductTypeList";
import ProductTypeList from "../ProductTypeList";
import {
  // createFilterStructure,
  ProductTypeFilterKeys,
  ProductTypeListFilterOpts
} from "./filters";

export interface ProductTypeListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<ProductTypeFilterKeys, ProductTypeListFilterOpts>,
    SortPage<ProductTypeListUrlSortField>,
    TabPageProps {
  productTypes: ProductTypeList_productTypes_edges_node[];
  onBack: () => void;
}

const ProductTypeListPage: React.FC<ProductTypeListPageProps> = ({
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
      <PageHeader title={intl.formatMessage(sectionNames.productTypes)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage id="create_product_type"
            defaultMessage="create product type"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({id: 'all_product_types',
            defaultMessage: "All Product Types",
            description: "tab name"
          })}
          // currencySymbol={currencySymbol}
          currentTab={currentTab}
          // filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({id: "search_product_type",
            defaultMessage: "Search Product Type"
          })}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <ProductTypeList {...listProps} />
      </Card>
    </Container>
  );
};
ProductTypeListPage.displayName = "ProductTypeListPage";
export default ProductTypeListPage;
