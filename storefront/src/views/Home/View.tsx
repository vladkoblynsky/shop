import * as React from 'react'

import { MetaWrapper } from '../../components'
import Page from './Page'
import { productsCardQuery } from '@sdk/queries/product'
import {
	BlogArticleOrderField,
	OrderDirection,
	ProductOrderField
} from '@temp/types/globalTypes'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import { useQuery } from '@apollo/client'
import { blogArticleListQuery } from '@sdk/queries/blog'
import useShop from '@temp/hooks/useShop'
import {
	BlogArticleList,
	BlogArticleListVariables
} from '@sdk/queries/types/BlogArticleList'

const PAGINATE_BY = 12

const View: React.FC = () => {
	const shop = useShop()
	const { data: newProductsData } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			sortBy: { direction: OrderDirection.DESC, field: ProductOrderField.DATE },
			includeCategory: false
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first'
		// ssr: false
	})
	const { data: popularProductsData } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			sortBy: {
				direction: OrderDirection.DESC,
				field: ProductOrderField.ORDER_COUNT
			},
			includeCategory: false
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first'
		// ssr: false
	})
	const { data: articlesData, loading: articlesLoading } = useQuery<
		BlogArticleList,
		BlogArticleListVariables
	>(blogArticleListQuery, {
		variables: {
			first: PAGINATE_BY,
			filter: { isPublished: true },
			sortBy: {
				direction: OrderDirection.DESC,
				field: BlogArticleOrderField.DATE
			}
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first'
	})
	return (
		<MetaWrapper meta={{}}>
			<Page
				loading={!newProductsData}
				newProducts={newProductsData?.products}
				popularProducts={popularProductsData?.products}
				articlesEdges={articlesData?.blogArticleList?.edges}
				articlesLoading={articlesLoading}
				shop={shop}
			/>
		</MetaWrapper>
	)
}

export default View
