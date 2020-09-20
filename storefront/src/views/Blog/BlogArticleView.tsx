import React from "react";
import useShop from "@temp/hooks/useShop";
import {MetaWrapper} from "@temp/components";
import {useParams} from "react-router";
import {useBlogArticleQuery} from "@sdk/queries/blog";
import BlogArticlePage from "@temp/views/Blog/BlogArticlePage";
import NotFound from "@temp/components/NotFound";


const BlogCategoryView:React.FC = () => {
    const shop = useShop();
    const {articleSlug} = useParams()
    const {data, loading} = useBlogArticleQuery({
        variables: {
            slug: articleSlug
        }
    });

    if (!data?.blogArticle && !loading) return <NotFound/>

    return(
        <MetaWrapper
            meta={{
                description: shop ? shop.description : "",
                title: shop ? `${data?.blogArticle?.title} - ${shop.name}` : "",
            }}
        >
            <BlogArticlePage article={data?.blogArticle} loading={loading}/>
        </MetaWrapper>
    )
};

export default BlogCategoryView;