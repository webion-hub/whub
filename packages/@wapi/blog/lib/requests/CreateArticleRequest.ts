import { BlogCategories } from "../model/BlogArticle";

export interface CreateArticleRequest {
  readonly language: string,
  readonly category: BlogCategories,
  readonly title: string,
  readonly cover: string,
  readonly content: string
}
