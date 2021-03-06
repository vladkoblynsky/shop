import { TableHead } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableCellHeader from "@temp/components/TableCellHeader";
import TablePagination from "@temp/components/TablePagination";
import { maybe, renderCollection, stopPropagation } from "@temp/misc";
import { PermissionGroupList_permissionGroups_edges_node } from "@temp/sections/permissionGroups/types/PermissionGroupList";
import { PermissionGroupListUrlSortField } from "@temp/sections/permissionGroups/urls";
import { ListProps, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colActions: {
        width: 180
      },
      colMembers: {
        width: 180
      },
      colName: {
        width: "auto"
      }
    },
    colActions: {
      paddingRight: theme.spacing(),
      textAlign: "right"
    },
    colActionsHeader: {
      textAlign: "right"
    },
    colMembers: {
      textAlign: "right"
    },
    colName: {
      paddingLeft: 0
    },
    link: {
      cursor: "pointer"
    }
  }),
  { name: "PermissionGroupList" }
);
const numberOfColumns = 3;

interface PermissionGroupListProps
  extends ListProps,
    SortPage<PermissionGroupListUrlSortField> {
  permissionGroups: PermissionGroupList_permissionGroups_edges_node[];
  onDelete: (id: string) => void;
}

const PermissionGroupList: React.FC<PermissionGroupListProps> = props => {
  const {
    disabled,
    permissionGroups,
    pageInfo,
    onDelete,
    onNextPage,
    onPreviousPage,
    onRowClick,
    onSort,
    sort
  } = props;
  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === PermissionGroupListUrlSortField.name
                ? getArrowDirection(sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(PermissionGroupListUrlSortField.name)}
            className={classes.colName}
          >
            <FormattedMessage id="permission_group_name"
              defaultMessage="Permission Group Name"
              description="permission group name"
            />
          </TableCellHeader>
          <TableCellHeader className={classes.colMembers} textAlign="right">
            <FormattedMessage id="members" defaultMessage="Members" />
          </TableCellHeader>
          <TableCell className={classes.colActionsHeader}>
            <FormattedMessage id="actions" defaultMessage="Actions" />
          </TableCell>
        </TableRow>
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
          permissionGroups,
          permissionGroup => (
            <TableRow
              className={!!permissionGroup ? classes.link : undefined}
              hover={!!permissionGroup}
              key={permissionGroup ? permissionGroup.id : "skeleton"}
              onClick={
                permissionGroup ? onRowClick(permissionGroup.id) : undefined
              }
              data-tc="id"
              data-tc-id={maybe(() => permissionGroup.id)}
            >
              <TableCell className={classes.colName}>
                {permissionGroup ? (
                  <span data-tc="name">{permissionGroup.name}</span>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colMembers}>
                {permissionGroup ? (
                  <span data-tc="members">{permissionGroup.users.length}</span>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colActions}>
                {permissionGroup ? (
                  <>
                    {permissionGroup.userCanManage && (
                      <IconButton
                        color="primary"
                        onClick={stopPropagation(() =>
                          onDelete(permissionGroup.id)
                        )}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage id="no_permission_groups_found" defaultMessage="No permission groups found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
PermissionGroupList.displayName = "PermissionGroupList";
export default PermissionGroupList;
