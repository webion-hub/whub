import { Endpoint, ApiBase } from '@webion/api-core';
import * as axios from 'axios';
import { AxiosInstance, CancelToken, AxiosResponse } from 'axios';

declare const blogCategories: readonly ["Business", "Coding", "Design", "Other"];
type BlogCategories = typeof blogCategories[number];
interface BlogArticle {
    readonly id: number;
    readonly webId: number;
    readonly language: string;
    readonly category: string;
    readonly publishDate: string;
    readonly title: string;
    readonly cover: string;
    readonly content: string;
    readonly readingTime: number;
}

interface CreateArticleRequest {
    readonly language: string;
    readonly category: BlogCategories;
    readonly title: string;
    readonly cover: string;
    readonly content: string;
}

interface CreateArticleResponse {
    readonly id: string;
    readonly webId: string;
}

declare class ArticleEndpoint extends Endpoint {
    private readonly language;
    private readonly webId;
    constructor(client: AxiosInstance, language: string, webId: number);
    get url(): string;
    load: () => Promise<axios.AxiosResponse<BlogArticle, any>>;
}

interface ArticleSearchRequest {
    readonly categories: BlogCategories[];
    readonly query: string;
}

declare class ArticlesEndpoint extends Endpoint {
    private readonly language;
    constructor(client: AxiosInstance, language: string);
    get url(): string;
    withId(webId: number): ArticleEndpoint;
    filter(request?: ArticleSearchRequest, cancelToken?: CancelToken): Promise<axios.AxiosResponse<BlogArticle[], any>>;
}

declare class BlogEndpoint extends Endpoint {
    get url(): string;
    forLanguage(lang: string): ArticlesEndpoint;
    create(request: CreateArticleRequest): Promise<AxiosResponse<CreateArticleResponse, any>>;
}

interface BlogSitemapItem {
    readonly language: string;
    readonly webId: string;
}

declare class SitemapEndpoint extends Endpoint {
    get url(): string;
    load(): Promise<axios.AxiosResponse<BlogSitemapItem[], any>>;
}

declare class BlogApi extends ApiBase {
    get articles(): BlogEndpoint;
    get sitemap(): SitemapEndpoint;
}

export { BlogApi, BlogArticle, BlogCategories, blogCategories, BlogApi as default };
