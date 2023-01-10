import { BlogCategories } from "../model/BlogArticle";

export interface ArticleSearchRequest {
  readonly categories: BlogCategories[],
  readonly query: string
}
