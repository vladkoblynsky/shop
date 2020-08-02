import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import {
  SortableTableBody,
  SortableTableRow
} from "@temp/components/SortableTable";
import { maybe, renderCollection, stopPropagation } from "@temp/misc";
import { ReorderAction } from "@temp/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { AttributeDetailsFragment_values } from "../../types/AttributeDetailsFragment";

export interface AttributeValuesProps {
  disabled: boolean;
  values: AttributeDetailsFragment_values[];
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
  onValueUpdate: (id: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    columnAdmin: {
      width: "50%"
    },
    columnDrag: {
      width: 48 + theme.spacing(1.5)
    },
    columnStore: {
      width: "50%"
    },
    dragIcon: {
      cursor: "grab"
    },
    iconCell: {
      "&:last-child": {
        paddingRight: theme.spacing()
      },
      width: 48 + theme.spacing(1.5)
    },
    link: {
      cursor: "pointer"
    }
  }),
  { name: "AttributeValues" }
);

const AttributeValues: React.FC<AttributeValuesProps> = ({
  disabled,
  onValueAdd,
  onValueDelete,
  onValueReorder,
  onValueUpdate,
  values
}) => {
  const classes = useStyles({});
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: 'attribute_values',
          defaultMessage: "Attribute Values",
          description: "section header"
        })}
        toolbar={
          <Button color="primary" variant="text" onClick={onValueAdd}>
            <FormattedMessage id="assign_value"
              defaultMessage="Assign value"
              description="assign attribute value button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell className={classes.columnDrag} />
            <TableCell className={classes.columnAdmin}>
              <FormattedMessage id="admin"
                defaultMessage="Admin"
                description="attribute values list: slug column header"
              />
            </TableCell>
            <TableCell className={classes.columnStore}>
              <FormattedMessage id="default_store_view"
                defaultMessage="Default Store View"
                description="attribute values list: name column header"
              />
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <SortableTableBody onSortEnd={onValueReorder}>
          {renderCollection(
            values,
            (value, valueIndex) => (
              <SortableTableRow
                className={!!value ? classes.link : undefined}
                hover={!!value}
                onClick={!!value ? () => onValueUpdate(value.id) : undefined}
                key={maybe(() => value.id)}
                index={valueIndex || 0}
              >
                <TableCell className={classes.columnAdmin}>
                  {maybe(() => value.slug) ? value.slug : <Skeleton />}
                </TableCell>
                <TableCell className={classes.columnStore}>
                  {maybe(() => value.name) ? value.name : <Skeleton />}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton
                    disabled={disabled}
                    onClick={stopPropagation(() => onValueDelete(value.id))}
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
              </SortableTableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={2}>
                  <FormattedMessage id="no_values_found"
                    defaultMessage="No values found"
                    description="No attribute values found"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
AttributeValues.displayName = "AttributeValues";
export default AttributeValues;
