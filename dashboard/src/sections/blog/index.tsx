import {useIntl} from "react-intl";
import {WindowTitle} from "@temp/components/WindowTitle";
import {sectionNames} from "@temp/intl";
import { parse as parseQs } from "qs";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import React from "react";
import {asSortParams} from "@temp/utils/sort";
import {
    blogCategoryAddPath,
    blogCategoryListPath,
    BlogCategoryListUrlQueryParams, BlogCategoryListUrlSortField,
    blogCategoryPath, BlogCategoryUrlQueryParams
} from "@temp/sections/blog/urls/blog_category_urls";
import BlogCategoryCreateView from "@temp/sections/blog/views/blogCategory/BlogCategoryCreateView";
import BlogCategoryListView from "@temp/sections/blog/views/blogCategory/BlogCategoryList";
import BlogCategoryDetailsView from "@temp/sections/blog/views/blogCategory/BlogCategoryDetailsView";
import {
    blogArticleAddPath,
    blogArticleListPath,
    BlogArticleListUrlQueryParams, BlogArticleListUrlSortField,
    blogArticlePath, BlogArticleUrlQueryParams
} from "@temp/sections/blog/urls/blog_article_urls";
import BlogArticleCreateView from "@temp/sections/blog/views/blogArticle/BlogArticleCreateView";
import BlogArticleListView from "@temp/sections/blog/views/blogArticle/BlogArticleList";
import BlogArticleDetailsView from "@temp/sections/blog/views/blogArticle/BlogArticleDetailsView";

const BlogCategoryList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BlogCategoryListUrlQueryParams = asSortParams(
    qs,
    BlogCategoryListUrlSortField,
    BlogCategoryListUrlSortField.name,
    false
  );
  return <BlogCategoryListView params={params} />;
};

interface BlogCategoryDetailsRouteProps {
  id: string;
}
const BlogCategoryDetails: React.FC<RouteComponentProps<
  BlogCategoryDetailsRouteProps
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BlogCategoryUrlQueryParams = qs;
  return (
    <BlogCategoryDetailsView
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const BlogArticleList: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BlogArticleListUrlQueryParams = asSortParams(
    qs,
    BlogArticleListUrlSortField,
    BlogArticleListUrlSortField.title,
    false
  );
  return <BlogArticleListView params={params} />;
};

interface BlogArticleDetailsRouteProps {
  id: string;
}
const BlogArticleDetails: React.FC<RouteComponentProps<
  BlogArticleDetailsRouteProps
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: BlogArticleUrlQueryParams = qs;
  return (
    <BlogArticleDetailsView
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const BlogCategoryComponent = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.blogCategories)} />
      <Switch>
        <Route exact path={blogCategoryListPath} component={BlogCategoryList} />
        <Route exact path={blogCategoryAddPath} component={BlogCategoryCreateView} />
        <Route path={blogCategoryPath(":id")} component={BlogCategoryDetails} />
      </Switch>
    </>
  );
};

export const BlogArticleComponent = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.blogArticles)} />
      <Switch>
        <Route exact path={blogArticleListPath} component={BlogArticleList} />
        <Route exact path={blogArticleAddPath} component={BlogArticleCreateView} />
        <Route path={blogArticlePath(":id")} component={BlogArticleDetails} />
      </Switch>
    </>
  );
};