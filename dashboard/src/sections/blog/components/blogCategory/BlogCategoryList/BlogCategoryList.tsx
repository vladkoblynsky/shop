import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import Checkbox from "@temp/components/Checkbox";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableHead from "@temp/components/TableHead";
import TablePagination from "@temp/components/TablePagination";
import { maybe, renderCollection } from "@temp/misc";
import { ICON_BUTTON_SIZE } from "@temp/theme";
import { ListActions, ListProps } from "@temp/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { BlogCategoryFragment } from "../../../types/BlogCategoryFragment";

export interface BlogCategoryListProps extends ListProps, ListActions {
    blogCategoryList: BlogCategoryFragment[];
    onAdd: () => void;
    onRemove: (id: string) => void;
}

const useStyles = makeStyles(
    theme => ({
        [theme.breakpoints.up("lg")]: {
            colType: {},
            colName: { width: 200 }
        },
        alignRight: {
            "&:last-child": {
                paddingRight: theme.spacing(1)
            },
            width: ICON_BUTTON_SIZE + theme.spacing(0.5)
        },
        colType: {},
        colName: {
            paddingLeft: 0
        },
        row: {
            cursor: "pointer"
        }
    }),
    { name: "BlogCategoryList" }
);

const numberOfColumns = 4;

const BlogCategoryList: React.FC<BlogCategoryListProps> = props => {
    const {
        disabled,
        settings,
        onAdd,
        onNextPage,
        onPreviousPage,
        onRemove,
        onUpdateListSettings,
        onRowClick,
        pageInfo,
        blogCategoryList,
        isChecked,
        selected,
        toggle,
        toggleAll,
        toolbar
    } = props;

    const classes = useStyles(props);
    const intl = useIntl();

    return (
        <Card>
            <CardTitle
                height="const"
                title={intl.formatMessage({
                    id: "blogCategories",
                    defaultMessage: "Blog Categories",
                    description: "sort blog category list, section header"
                })}
                toolbar={
                    <Button color="primary" onClick={onAdd}>
                        <FormattedMessage id="createBlogCategory"
                            defaultMessage="Create blog category"
                            description="button"
                        />
                    </Button>
                }
            />
            <ResponsiveTable>
                <TableHead
                    colSpan={numberOfColumns}
                    selected={selected}
                    disabled={disabled}
                    items={blogCategoryList}
                    toggleAll={toggleAll}
                    toolbar={toolbar}
                >
                    <TableCell className={classes.colName}>
                        <FormattedMessage id="blogCategoryName"
                            defaultMessage="Name"
                            description="blog"
                        />
                    </TableCell>
                    <TableCell className={classes.colType}>
                        <FormattedMessage id="description" defaultMessage="Description" />
                    </TableCell>
                    <TableCell />
                </TableHead>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={4}
                            settings={settings}
                            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
                            onNextPage={onNextPage}
                            onUpdateListSettings={onUpdateListSettings}
                            hasPreviousPage={
                                pageInfo && !disabled ? pageInfo.hasPreviousPage : false
                            }
                            onPreviousPage={onPreviousPage}
                        />
                    </TableRow>
                </TableFooter>
                <TableBody>
                    {renderCollection(
                        blogCategoryList,
                        blog => {
                            const isSelected = blog
                                ? isChecked(blog.id)
                                : false;

                            return (
                                <TableRow
                                    className={classes.row}
                                    hover={!!blog}
                                    key={blog ? blog.id : "skeleton"}
                                    onClick={blog && onRowClick(blog.id)}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            disabled={disabled}
                                            disableClickPropagation
                                            onChange={() => toggle(blog.id)}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.colName}>
                                        {maybe<React.ReactNode>(
                                            () => blog.name,
                                            <Skeleton />
                                        )}
                                    </TableCell>
                                    <TableCell className={classes.colType}>
                                        {maybe<React.ReactNode>(
                                            () => blog.description,
                                            <Skeleton />
                                        )}
                                    </TableCell>
                                    <TableCell className={classes.alignRight}>
                                        <IconButton
                                            color="primary"
                                            disabled={disabled}
                                            onClick={event => {
                                                event.stopPropagation();
                                                onRemove(blog.id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        },
                        () => (
                            <TableRow>
                                <TableCell colSpan={numberOfColumns}>
                                    <FormattedMessage id="noBlogCategoriesFound" defaultMessage="No blog categories found" />
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </ResponsiveTable>
        </Card>
    );
};
BlogCategoryList.displayName = "BlogCategoryList";
export default BlogCategoryList;