import "./scss/index.scss";

import React from "react";
import _ from 'lodash';

import { structuredData } from "../../core/SEO/Homepage/structuredData";
import {Container} from "@material-ui/core";
import {HomeCarousel} from "@temp/components/HomeCarousel";
import {NewsCarousel} from "@temp/components/NewsCarousel";
import Carousel from "react-multi-carousel";
import {ProductCard} from "@temp/components/ProductCard";
import Loader from "@temp/components/Loader";
import Typography from "@material-ui/core/Typography";
import {Shop_shop} from "@sdk/queries/types/Shop";
import {ProductsCardDetails_products} from "@sdk/queries/types/ProductsCardDetails";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {BlogArticleList_blogArticleList_edges} from "@sdk/queries/types/BlogArticleList";
import {IArticleCard} from "@temp/components/ArticleCard/ArticleCard";
import {dateToShortString} from "@temp/core/utils";
import {Skeleton} from "@material-ui/lab";

const responsive = {
    large:{
        breakpoint: { max: 3000, min: 1376 },
        items: 5,
        slidesToSlide: 5 // optional, default to 1.
    },
    desktop: {
        breakpoint: { max: 1376, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 500 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const CarouselSkeleton: React.FC = () => {
    const items = _.fill(new Array(5), 1);

    return(
        <Carousel swipeable
                  draggable={false}
                  responsive={responsive}
                  keyBoardControl
                  customTransition="transform 300ms ease-in-out"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}>
            {items.map((item, i) => <div key={i}>
                    <Skeleton variant="rect" height={250}/>
                    <Skeleton variant="text" width="40%"/>
                    <Skeleton variant="text" width="60%"/>
                    <Skeleton variant="rect" width="100%" height={25} className="my-15"/>
                    <Skeleton variant="text" width="25%"/>
                </div>
            )}
        </Carousel>
    )
};

const Page: React.FC<{
    loading: boolean;
    shop: Shop_shop,
    newProducts: ProductsCardDetails_products,
    popularProducts: ProductsCardDetails_products,
    articlesEdges: BlogArticleList_blogArticleList_edges[],
    articlesLoading: boolean;

}> = ({
          loading, shop, newProducts,
          popularProducts, articlesEdges, articlesLoading
      }) => {

    const news: IArticleCard[] = articlesEdges?.map(edge => ({
        id: edge.node.id,
        categorySlug: edge.node.category.slug,
        articleSlug: edge.node.slug,
        title: edge.node.title,
        text: edge.node.body,
        created: dateToShortString(edge.node.dateAdded),
        img: edge.node.thumbnail.url,
        subtitle: edge.node.subtitle,
        status: edge.node.status,
        keywords: edge.node.keywords,
        tags: edge.node.tags
    })) || [];

    // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    //     setTabValue(newValue);
    // };
    return (
        <div className="home-page">
            <script className="structured-data-list" type="application/ld+json">
                {shop ? structuredData(shop) : ''}
            </script>
            {loading && <Loader absolute full/>}
            <HomeCarousel />
            <Container maxWidth="xl">

                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-10 text-center">Новинки</Typography>
                        <div className="separator max-w-300"/>
                        {newProducts?.edges.length > 0 &&
                        <Carousel swipeable
                                  draggable={false}
                                  responsive={responsive}
                                  keyBoardControl
                                  customTransition="transform 300ms ease-in-out"
                                  transitionDuration={500}
                                  containerClass="carousel-container"
                                  removeArrowOnDeviceType={["tablet", "mobile"]}>
                            {newProducts?.edges.map((item, i) => <ProductCard key={i} item={item.node}/>)}
                        </Carousel>
                        }
                        {!newProducts?.edges.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-10 text-center">Лучшие предложения</Typography>
                        <div className="separator max-w-500"/>
                        {popularProducts?.edges.length > 0 &&
                        <Carousel swipeable
                                  draggable={false}
                                  responsive={responsive}
                                  keyBoardControl
                                  customTransition="transform 300ms ease-in-out"
                                  transitionDuration={500}
                                  containerClass="carousel-container"
                                  removeArrowOnDeviceType={["tablet", "mobile"]}>
                            {popularProducts?.edges.map((item, i) => <ProductCard key={i} item={item.node}/>)}
                        </Carousel>
                        }
                        {!popularProducts?.edges.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                {(articlesLoading || !!news.length) &&
                <Card className="my-20">
                    <CardContent>
                        <Typography variant="h3" className="pt-20 pb-5 text-center">Новости</Typography>
                        <div className="separator max-w-300"/>
                        {!!news.length &&
                        <NewsCarousel news={news}/>
                        }
                        {!news.length &&
                        <CarouselSkeleton/>
                        }
                    </CardContent>
                </Card>
                }
            </Container>
        </div>
    );
};

export default Page;