import urlJoin from 'url-join'
import {
	ActiveTab,
	BulkAction,
	Dialog,
	Pagination,
	Sort,
	TabActionDialog
} from '@temp/types'
import { stringifyQs } from '@temp/utils/urls'
import { ExportObjOrderField, StockAvailability } from '@temp/types/globalTypes'
import {
	BooleanParam,
	QueryParamConfig,
	StringParam,
	DecodedValueMap,
	SetQuery,
	ArrayParam
} from 'use-query-params'

const productSection = '/products/'

export const productAddPath = urlJoin(productSection, 'add')
export const productAddUrl = productAddPath
export const productExportUrl = urlJoin(productSection, 'export-import')

export const productListPath = productSection

export type ProductListUrlDialog =
	| 'publish'
	| 'unpublish'
	| 'delete'
	| TabActionDialog

export enum ProductListUrlSortField {
	attribute = 'attribute',
	name = 'name',
	productType = 'productType',
	status = 'status',
	stockStatus = 'stockStatus',
	price = 'price'
}

export type ProductListUrlSort = Sort<ProductListUrlSortField>
export interface ProductListUrlQueryParams
	extends BulkAction,
		Dialog<ProductListUrlDialog>,
		ProductListUrlSort,
		Pagination,
		ActiveTab {
	attributeId?: string
	stockStatus?: StockAvailability
	query?: string
}

export const productListUrl = (params?: ProductListUrlQueryParams): string =>
	productListPath + '?' + stringifyQs(params)

export const productPath = (id: string) => urlJoin(productSection + id)
export type ProductUrlDialog = 'remove' | 'remove-variants'
export type ProductUrlQueryParams = BulkAction & Dialog<ProductUrlDialog>
export const productUrl = (id: string, params?: ProductUrlQueryParams) =>
	productPath(encodeURIComponent(id)) + '?' + stringifyQs(params)

export const productVariantEditPath = (productId: string, variantId: string) =>
	urlJoin(productSection, productId, 'variant', variantId)
export type ProductVariantEditUrlDialog = 'remove'
export type ProductVariantEditUrlQueryParams = Dialog<ProductVariantEditUrlDialog>
export const productVariantEditUrl = (
	productId: string,
	variantId: string,
	params?: ProductVariantEditUrlQueryParams
) =>
	productVariantEditPath(
		encodeURIComponent(productId),
		encodeURIComponent(variantId)
	) +
	'?' +
	stringifyQs(params)

export const productVariantCreatorPath = (productId: string) =>
	urlJoin(productSection, productId, 'variant-creator')
export const productVariantCreatorUrl = (productId: string) =>
	productVariantCreatorPath(encodeURIComponent(productId))

export const productVariantAddPath = (productId: string) =>
	urlJoin(productSection, productId, 'variant/add')
export const productVariantAddUrl = (productId: string): string =>
	productVariantAddPath(encodeURIComponent(productId))

export const productImagePath = (productId: string, imageId: string) =>
	urlJoin(productSection, productId, 'image', imageId)

export type ProductImageUrlQueryParams = Dialog<'remove'>
export const productImageUrl = (
	productId: string,
	imageId: string,
	params?: ProductImageUrlQueryParams
) =>
	productImagePath(encodeURIComponent(productId), encodeURIComponent(imageId)) +
	'?' +
	stringifyQs(params)

export type ProductExportListUrlDialog = 'delete' | TabActionDialog
export const productExportPageQueryParams = {
	sort: StringParam as QueryParamConfig<ExportObjOrderField | null>,
	asc: BooleanParam,
	activeTab: StringParam as QueryParamConfig<ActiveTab['activeTab'] | null>,
	action: StringParam as QueryParamConfig<
		Dialog<ProductExportListUrlDialog>['action'] | null
	>,
	query: StringParam as QueryParamConfig<string | null>,
	after: StringParam as QueryParamConfig<Pagination['after'] | null>,
	before: StringParam as QueryParamConfig<Pagination['before'] | null>,
	ids: ArrayParam as QueryParamConfig<BulkAction['ids'] | null>
}
export type TProductExportParams = DecodedValueMap<
	typeof productExportPageQueryParams
>
export type TSetProductExportParams = SetQuery<
	typeof productExportPageQueryParams
>

export const productExportListUrl = (params?: TProductExportParams): string =>
	productExportUrl + '?' + stringifyQs(params)
