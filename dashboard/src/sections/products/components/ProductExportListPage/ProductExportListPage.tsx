import React from 'react'
import PageHeader from '@temp/components/PageHeader'
import { buttonMessages, commonMessages, sectionNames } from '@temp/intl'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@material-ui/core'
import FilterBar from '@temp/components/FilterBar'
import Card from '@material-ui/core/Card'
import DeleteIcon from '@material-ui/icons/Delete'
import {
	productExportListUrl,
	ProductExportListUrlDialog,
	productListUrl,
	TProductExportParams,
	TSetProductExportParams
} from '@temp/sections/products/urls'
import useLocalStorage from '@temp/hooks/useLocalStorage'
import SaveFilterTabDialog, {
	SaveFilterTabDialogFormData
} from '@temp/components/SaveFilterTabDialog'
import DeleteFilterTabDialog from '@temp/components/DeleteFilterTabDialog'
import { maybe } from '@temp/misc'
import useListSettings from '@temp/hooks/useListSettings'
import { ListViews } from '@temp/types'
import { TypedProductExportListQuery } from '@temp/sections/products/queries'
import usePaginator, { createPaginationState } from '@temp/hooks/usePaginator'
import useNavigator from '@temp/hooks/useNavigator'
import useBulkActions from '@temp/hooks/useBulkActions'
import createDialogActionHandlers from '@temp/utils/handlers/dialogActionHandlers'
import {
	TypedExportBulkDeleteMutation,
	TypedProductVariantExportMutation,
	TypedProductVariantImportMutation
} from '@temp/sections/products/mutations'
import useNotifier from '@temp/hooks/useNotifier'
import IconButton from '@material-ui/core/IconButton'
import ActionDialog from '@temp/components/ActionDialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import { ExportObjOrderField, OrderDirection } from '@temp/types/globalTypes'
import { ExportObjListVariables } from '@temp/sections/products/types/ExportObjList'
import ProductExportList from '@temp/sections/products/components/ProductExportList/ProductExportList'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { ExportObjBulkDelete } from '@temp/sections/products/types/ExportObjBulkDelete'
import AppHeader from '@temp/components/AppHeader'
import useAppState from '@temp/hooks/useAppState'

const STORAGE_TABS_KEY = 'productExportListTabs'

interface FilterItemData {
	sort?: ExportObjOrderField
	asc?: boolean
	query?: string
}
interface FilterItem {
	data: FilterItemData
	name: string
}

const DIALOG_ACTIONS = {
	saveSearch: 'save-search',
	deleteSearch: 'delete-search'
}

const ProductExportListPage: React.FC<{
	params: TProductExportParams
	changeUrlParams: TSetProductExportParams
}> = ({ params, changeUrlParams }) => {
	const intl = useIntl()
	const paginate = usePaginator()
	const navigate = useNavigator()
	const notify = useNotifier()
	const [, dispatchAppState] = useAppState()
	const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
		params.ids
	)
	const [listTabs, setListTabs] = useLocalStorage<FilterItem[]>(
		STORAGE_TABS_KEY,
		[]
	)
	const { updateListSettings, settings } = useListSettings(
		ListViews.PRODUCT_EXPORT_LIST
	)
	const paginationState = createPaginationState(settings.rowNumber, params)
	const queryVariables = React.useMemo<ExportObjListVariables>(
		() => ({
			...paginationState,
			filter: {
				status: params.query
			},
			sortBy: {
				field: params.sort || ExportObjOrderField.DATE,
				direction: params.asc ? OrderDirection.ASC : OrderDirection.DESC
			}
		}),
		[params, settings.rowNumber]
	)
	const [openModal, closeModal] = createDialogActionHandlers<
		ProductExportListUrlDialog,
		TProductExportParams
	>(navigate, productExportListUrl, params)

	const tabs = listTabs
	const currentTab = params.activeTab || '0'

	const onAll = () => {
		changeUrlParams({
			activeTab: '0',
			action: null,
			query: '',
			after: '',
			before: ''
		})
	}
	const onTabSave = () => {
		changeUrlParams({ action: 'save-search' })
	}
	const onTabChange = (tab: number) => {
		reset()
		changeUrlParams({
			activeTab: tab.toString(),
			...listTabs[tab - 1].data,
			after: '',
			before: ''
		})
	}
	const onTabDelete = (tab) => {
		changeUrlParams({ action: 'delete-search', after: '', before: '' })
	}

	const onSearchChange = (q) => {
		if (!q) {
			changeUrlParams({ activeTab: '0', query: q })
		} else {
			const index = listTabs.findIndex((tab) => tab.data.query === q)
			const activeTab = index !== -1 ? index + 1 : listTabs.length + 1
			changeUrlParams({ activeTab: activeTab.toString(), query: q })
		}
	}

	const handleFilterTabSave = ({ name }: SaveFilterTabDialogFormData) => {
		if (!!name) {
			const data: FilterItemData = {
				query: params.query,
				asc: params.asc,
				sort: params.sort
			}
			setListTabs([...listTabs, { name, data }])
			closeModal()
		}
	}
	const handleFilterTabDelete = () => {
		if (parseInt(currentTab) <= listTabs.length) {
			setListTabs(listTabs.filter((tab, i) => i !== parseInt(currentTab) - 1))
			changeUrlParams({ activeTab: '0', action: null, query: '' })
		}
		closeModal()
	}

	const onSort = (sort: ExportObjOrderField) => {
		const asc = params.sort === sort ? !params.asc : true
		changeUrlParams({ sort, asc })
	}
	const onBack = () => {
		navigate(productListUrl())
	}
	return (
		<TypedProductExportListQuery displayLoader variables={queryVariables}>
			{({ data, loading, refetch }) => {
				const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
					maybe(() => data.exportObjList.pageInfo),
					paginationState,
					params
				)

				const handleBulkDelete = (data: ExportObjBulkDelete) => {
					if (data.exportObjBulkDelete.productErrors.length === 0) {
						closeModal()
						notify({
							text: intl.formatMessage(commonMessages.savedChanges)
						})
						reset()
						refetch()
					}
				}

				return (
					<TypedExportBulkDeleteMutation onCompleted={handleBulkDelete}>
						{(exportsBulkDelete, exportsBulkDeleteOpts) => (
							<TypedProductVariantExportMutation
								onCompleted={async () => {
									await refetch()
								}}
							>
								{(productVariantExport, productVariantExportOpts) => (
									<TypedProductVariantImportMutation
										onCompleted={async () => {
											await refetch()
										}}
									>
										{(productVariantImport, productVariantImportOpts) => (
											<>
												<AppHeader onBack={onBack}>
													{intl.formatMessage(sectionNames.products)}
												</AppHeader>
												<PageHeader
													title={intl.formatMessage(
														sectionNames.exportImportList
													)}
												>
													<ButtonGroup>
														<Button
															color='primary'
															variant='outlined'
															data-tc='import-products'
															component='label'
															disabled={productVariantImportOpts.loading}
														>
															<FormattedMessage
																{...buttonMessages.importProducts}
																description='button'
															/>
															<input
																type='file'
																onChange={async (e) => {
																	if (!!e.target?.files?.length) {
																		dispatchAppState({
																			type: 'displayLoader',
																			payload: { value: true }
																		})
																		await productVariantImport({
																			context: {
																				useBatching: false
																			},
																			variables: {
																				file: e.target.files[0]
																			}
																		})
																	}
																}}
																accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
																hidden
															/>
														</Button>
														<Button
															onClick={async () => {
																dispatchAppState({
																	type: 'displayLoader',
																	payload: { value: true }
																})
																await productVariantExport()
															}}
															color='primary'
															variant='contained'
															data-tc='export-products'
															disabled={productVariantExportOpts.loading}
														>
															<FormattedMessage
																{...buttonMessages.exportProducts}
																description='button'
															/>
														</Button>
													</ButtonGroup>
												</PageHeader>
												<Card>
													<FilterBar
														currentTab={parseInt(currentTab)}
														initialSearch={params.query || ''}
														onAll={onAll}
														onSearchChange={onSearchChange}
														onTabChange={onTabChange}
														onTabDelete={onTabDelete}
														onTabSave={onTabSave}
														tabs={tabs.map((tab) => tab.name)}
														allTabLabel={intl.formatMessage(commonMessages.all)}
														searchPlaceholder={intl.formatMessage(
															commonMessages.search
														)}
													/>
													<ProductExportList
														sort={{
															asc: params.asc,
															sort: params.sort
														}}
														onSort={onSort}
														disabled={loading}
														exportObjList={maybe(() =>
															data.exportObjList.edges.map((edge) => edge.node)
														)}
														settings={settings}
														onNextPage={loadNextPage}
														onPreviousPage={loadPreviousPage}
														onUpdateListSettings={updateListSettings}
														pageInfo={pageInfo}
														onRowClick={(id) => () => null}
														toolbar={
															<>
																<IconButton
																	color='primary'
																	onClick={() =>
																		openModal('delete', {
																			ids: listElements
																		} as any)
																	}
																>
																	<DeleteIcon />
																</IconButton>
															</>
														}
														isChecked={isSelected}
														selected={listElements.length}
														toggle={toggle}
														toggleAll={toggleAll}
														onListSettingsReset={reset}
													/>
												</Card>
												<ActionDialog
													open={params.action === 'delete'}
													confirmButtonState={exportsBulkDeleteOpts.status}
													onClose={closeModal}
													onConfirm={() =>
														exportsBulkDelete({
															variables: { ids: listElements }
														})
													}
													title={intl.formatMessage(
														commonMessages.deleteExportsTitle
													)}
													variant='delete'
												>
													<DialogContentText>
														<FormattedMessage
															{...commonMessages.deleteExports}
															values={{
																counter: maybe(() => params.ids.length),
																displayQuantity: (
																	<strong>
																		{maybe(() => params.ids.length)}
																	</strong>
																)
															}}
														/>
													</DialogContentText>
												</ActionDialog>
												<SaveFilterTabDialog
													open={params.action === DIALOG_ACTIONS.saveSearch}
													confirmButtonState='default'
													onClose={closeModal}
													onSubmit={handleFilterTabSave}
												/>
												<DeleteFilterTabDialog
													open={params.action === DIALOG_ACTIONS.deleteSearch}
													confirmButtonState='default'
													onClose={closeModal}
													onSubmit={handleFilterTabDelete}
													tabName={maybe(
														() => tabs[parseInt(currentTab) - 1].name,
														'...'
													)}
												/>
											</>
										)}
									</TypedProductVariantImportMutation>
								)}
							</TypedProductVariantExportMutation>
						)}
					</TypedExportBulkDeleteMutation>
				)
			}}
		</TypedProductExportListQuery>
	)
}

export default ProductExportListPage
