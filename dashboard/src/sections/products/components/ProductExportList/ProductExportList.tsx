import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@temp/components/Checkbox'
import ResponsiveTable from '@temp/components/ResponsiveTable'
import Skeleton from '@temp/components/Skeleton'
import { AVATAR_MARGIN } from '@temp/components/TableCellAvatar'
import TableCellHeader from '@temp/components/TableCellHeader'
import TableHead from '@temp/components/TableHead'
import TablePagination from '@temp/components/TablePagination'
import { dateToString, maybe, renderCollection } from '@temp/misc'
import { ListActions, ListProps, SortPage } from '@temp/types'
import { getArrowDirection } from '@temp/utils/sort'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ExportObjList_exportObjList_edges_node } from '@temp/sections/products/types/ExportObjList'
import { ExportObjOrderField } from '@temp/types/globalTypes'
import { Link } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(
	(theme) => ({
		[theme.breakpoints.up('lg')]: {
			colName: {
				width: 'auto'
			},
			colPrice: {
				width: 200
			},
			colPublished: {
				width: 200
			},
			colType: {
				width: 200
			}
		},
		colAttribute: {
			width: 150
		},
		colFill: {
			padding: 0,
			width: '100%'
		},
		colName: {
			'&$colNameFixed': {
				width: 250
			}
		},
		colNameFixed: {},
		colNameHeader: {
			marginLeft: AVATAR_MARGIN
		},
		colPrice: {
			textAlign: 'right'
		},
		colPublished: {},
		colType: {},
		link: {
			cursor: 'pointer'
		},
		table: {
			tableLayout: 'fixed'
		},
		tableContainer: {
			overflowX: 'auto'
		},
		textLeft: {
			textAlign: 'left'
		},
		textRight: {
			textAlign: 'right'
		}
	}),
	{ name: 'ProductExportList' }
)

interface ProductExportListProps
	extends ListProps,
		ListActions,
		SortPage<ExportObjOrderField> {
	exportObjList: ExportObjList_exportObjList_edges_node[]
}

export const ProductExportList: React.FC<ProductExportListProps> = (props) => {
	const {
		settings,
		disabled,
		isChecked,
		pageInfo,
		exportObjList,
		selected,
		sort,
		toggle,
		toggleAll,
		toolbar,
		onNextPage,
		onPreviousPage,
		onUpdateListSettings,
		// onRowClick,
		onSort
	} = props

	const classes = useStyles(props)

	const numberOfColumns = 5

	return (
		<ResponsiveTable>
			<TableHead
				colSpan={numberOfColumns}
				selected={selected}
				disabled={disabled}
				items={exportObjList}
				toggleAll={toggleAll}
				toolbar={toolbar}
			>
				<TableCellHeader
					direction={
						sort.sort === ExportObjOrderField.DATE
							? getArrowDirection(sort.asc)
							: undefined
					}
					arrowPosition='right'
					onClick={() => onSort(ExportObjOrderField.DATE)}
					className={classes.colName}
				>
					<FormattedMessage id='created' defaultMessage='Created' />
				</TableCellHeader>
				<TableCellHeader
					direction={
						sort.sort === ExportObjOrderField.STATUS
							? getArrowDirection(sort.asc)
							: undefined
					}
					onClick={() => onSort(ExportObjOrderField.STATUS)}
				>
					<FormattedMessage id='status' defaultMessage='Status' />
				</TableCellHeader>
				<TableCellHeader>
					<FormattedMessage id='fileName' defaultMessage='File name' />
				</TableCellHeader>
				<TableCellHeader textAlign='right' />
			</TableHead>
			<TableFooter>
				<TableRow>
					<TablePagination
						colSpan={numberOfColumns}
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
					exportObjList,
					(obj) => {
						const isSelected = obj ? isChecked(obj.id) : false

						return (
							<TableRow
								className={!!obj ? classes.tableRow : undefined}
								hover={!!obj}
								key={obj ? obj.id : 'skeleton'}
								selected={isSelected}
								// onClick={obj ? onRowClick(obj.id) : undefined}
							>
								<TableCell padding='checkbox'>
									<Checkbox
										checked={isSelected}
										disabled={disabled}
										disableClickPropagation
										onChange={() => toggle(obj.id)}
									/>
								</TableCell>
								<TableCell className={classes.colName}>
									{maybe<React.ReactNode>(
										() => dateToString(obj.created),
										<Skeleton />
									)}
								</TableCell>
								<TableCell>
									{maybe<React.ReactNode>(() => obj.status, <Skeleton />)}
								</TableCell>
								<TableCell>
									{maybe<React.ReactNode>(() => obj.fileName, <Skeleton />)}
								</TableCell>
								<TableCell align='right'>
									<Button
										component={Link}
										color='secondary'
										href={maybe<string>(() => obj.storageUrl, '#!')}
									>
										{maybe<React.ReactNode>(
											() =>
												obj.storageUrl ? (
													<FormattedMessage
														id='download'
														defaultMessage='Download'
													/>
												) : (
													''
												),
											<Skeleton />
										)}
									</Button>
								</TableCell>
							</TableRow>
						)
					},
					() => (
						<TableRow>
							<TableCell colSpan={numberOfColumns}>
								<FormattedMessage
									id='no_export_obj_found'
									defaultMessage='No export objects found'
								/>
							</TableCell>
						</TableRow>
					)
				)}
			</TableBody>
		</ResponsiveTable>
	)
}
ProductExportList.displayName = 'ProductExportList'
export default ProductExportList
