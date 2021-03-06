import React from 'react'
import useShop from '@temp/hooks/useShop'
import { MetaWrapper } from '@temp/components'
import BlogCategoryPage from '@temp/views/Blog/BlogCategoryPage'
import { useBlogArticleListQuery } from '@sdk/queries/blog'
import { BlogArticleOrderField, OrderDirection } from '@temp/types/globalTypes'
import Loader from '@temp/components/Loader'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import NotFound from '@temp/components/NotFound'
import { useRouter } from 'next/router'

const PAGINATE_BY = 20

const BlogCategoryView: React.FC = () => {
	const shop = useShop()
	const router = useRouter()
	const { data, loading, loadMore } = useBlogArticleListQuery({
		variables: {
			first: PAGINATE_BY,
			filter: { category_Slug: router.query?.slug as string },
			sortBy: {
				direction: OrderDirection.DESC,
				field: BlogArticleOrderField.DATE
			}
		}
	})

	if (!data?.blogArticleList && !loading) return <NotFound />

	const handleLoadMore = async () => {
		if (!loading) {
			await loadMore(
				(prev, next) => {
					return {
						blogArticleList: {
							...prev.blogArticleList,
							...next.blogArticleList,
							edges: _.uniqBy(
								[...prev.blogArticleList.edges, ...next.blogArticleList.edges],
								(edge) => edge.node.id
							)
						}
					}
				},
				{
					first: PAGINATE_BY,
					after: data?.blogArticleList.pageInfo.endCursor
				}
			)
		}
	}

	const categoryName = data?.blogArticleList?.edges[0]?.node.category.name || ''

	return (
		<MetaWrapper
			meta={{
				description: shop ? shop.description : '',
				title: categoryName ? `Блог - ${categoryName}` : ''
			}}
		>
			{loading && !data && <Loader full />}
			<InfiniteScroll
				pageStart={0}
				loadMore={handleLoadMore}
				hasMore={data?.blogArticleList.pageInfo.hasNextPage}
				loader={<Loader key={0} />}
			>
				<BlogCategoryPage
					articles={data?.blogArticleList}
					loading={loading}
					categoryName={categoryName}
				/>
			</InfiniteScroll>
		</MetaWrapper>
	)
}

export default BlogCategoryView
