import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { AttributeListUrlSortField } from "../../urls";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableCellHeader from "@temp/components/TableCellHeader";
import TableHead from "@temp/components/TableHead";
import TablePagination from "@temp/components/TablePagination";
import { translateBoolean } from "@temp/intl";
import { maybe, renderCollection } from "@temp/misc";
import { ListActions, ListProps, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { AttributeList_attributes_edges_node } from "../../types/AttributeList";

export interface AttributeListProps
  extends ListProps,
    ListActions,
    SortPage<AttributeListUrlSortField> {
  attributes: AttributeList_attributes_edges_node[];
}

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colFaceted: {
        width: 180
      },
      colName: {
        width: "auto"
      },
      colSearchable: {
        width: 180
      },
      colSlug: {
        width: 200
      },
      colVisible: {
        width: 180
      }
    },
    colFaceted: {
      textAlign: "center"
    },
    colName: {},
    colSearchable: {
      textAlign: "center"
    },
    colSlug: {
      paddingLeft: 0
    },
    colVisible: {
      textAlign: "center"
    },
    link: {
      cursor: "pointer"
    }
  }),
  { name: "AttributeList" }
);

const numberOfColumns = 6;

const AttributeList: React.FC<AttributeListProps> = ({
  attributes,
  disabled,
  isChecked,
  onNextPage,
  onPreviousPage,
  onRowClick,
  pageInfo,
  selected,
  sort,
  toggle,
  toggleAll,
  toolbar,
  onSort
}) => {
  const classes = useStyles({});
  const intl = useIntl();

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={attributes}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          className={classes.colSlug}
          direction={
            sort.sort === AttributeListUrlSortField.slug
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(AttributeListUrlSortField.slug)}
        >
          <FormattedMessage id="attribute_code" defaultMessage="Attribute Code" />
        </TableCellHeader>
        <TableCellHeader
          className={classes.colName}
          direction={
            sort.sort === AttributeListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(AttributeListUrlSortField.name)}
        >
          <FormattedMessage id="default_label"
            defaultMessage="Default Label"
            description="attribute's label'"
          />
        </TableCellHeader>
        <TableCellHeader
          className={classes.colVisible}
          direction={
            sort.sort === AttributeListUrlSortField.visible
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlSortField.visible)}
        >
          <FormattedMessage id="visible"
            defaultMessage="Visible"
            description="attribute is visible"
          />
        </TableCellHeader>
        <TableCellHeader
          className={classes.colSearchable}
          direction={
            sort.sort === AttributeListUrlSortField.searchable
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlSortField.searchable)}
        >
          <FormattedMessage id="searchable"
            defaultMessage="Searchable"
            description="attribute can be searched in dashboard"
          />
        </TableCellHeader>
        <TableCellHeader
          className={classes.colFaceted}
          direction={
            sort.sort === AttributeListUrlSortField.useInFacetedSearch
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlSortField.useInFacetedSearch)}
        >
          <FormattedMessage id="use_faceted_search"
            defaultMessage="Use in faceted search"
            description="attribute can be searched in storefront"
          />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          attributes,
          attribute => {
            const isSelected = attribute ? isChecked(attribute.id) : false;

            return (
              <TableRow
                selected={isSelected}
                hover={!!attribute}
                key={attribute ? attribute.id : "skeleton"}
                onClick={attribute && onRowClick(attribute.id)}
                className={classes.link}
                data-tc="id"
                data-tc-id={maybe(() => attribute.id)}
                data-tc-values={JSON.stringify(
                  maybe(() => attribute.values, [])
                )}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(attribute.id)}
                  />
                </TableCell>
                <TableCell className={classes.colSlug} data-tc="slug">
                  {attribute ? attribute.slug : <Skeleton />}
                </TableCell>
                <TableCell className={classes.colName} data-tc="name">
                  {attribute ? attribute.name : <Skeleton />}
                </TableCell>
                <TableCell
                  className={classes.colVisible}
                  data-tc="visible"
                  data-tc-visible={maybe(() => attribute.visibleInStorefront)}
                >
                  {attribute ? (
                    translateBoolean(attribute.visibleInStorefront, intl)
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell
                  className={classes.colSearchable}
                  data-tc="searchable"
                  data-tc-searchable={maybe(
                    () => attribute.filterableInDashboard
                  )}
                >
                  {attribute ? (
                    translateBoolean(attribute.filterableInDashboard, intl)
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell
                  className={classes.colFaceted}
                  data-tc="use-in-faceted-search"
                  data-tc-use-in-faceted-search={maybe(
                    () => attribute.filterableInStorefront
                  )}
                >
                  {attribute ? (
                    translateBoolean(attribute.filterableInStorefront, intl)
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage id="no_attributes_found" defaultMessage="No attributes found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
AttributeList.displayName = "AttributeList";
export default AttributeList;
