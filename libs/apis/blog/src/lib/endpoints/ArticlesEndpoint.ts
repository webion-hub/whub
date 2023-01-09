import { Endpoint } from "@whub/apis-core";
import { BlogArticle } from "../model/BlogArticle";
import { ArticleEndpoint } from "./ArticleEndpoint";
import { AxiosInstance } from "axios";

export class ArticlesEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly language: string,
  ) { super(client); }

  get url() {
    return `/articles/${this.language}`;
  }

  withId(webId: number) {
    return new ArticleEndpoint(this.client, this.language, webId);
  }

  async list() {
    return this.client
      .get<BlogArticle[]>(this.url)
  }
}
