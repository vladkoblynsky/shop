import React from 'react'
import Container from '@temp/components/Container'
import { ProductExportListPage } from '@temp/sections/products/components/ProductExportListPage'
import { useQueryParams } from 'use-query-params'
import { productExportPageQueryParams } from '@temp/sections/products/urls'

const View: React.FC = () => {
	const [query, setQuery] = useQueryParams(productExportPageQueryParams)

	return (
		<Container>
			<ProductExportListPage params={query} changeUrlParams={setQuery} />
		</Container>
	)
}

export default View
