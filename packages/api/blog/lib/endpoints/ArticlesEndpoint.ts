import { BlogArticle } from "../model/BlogArticle";
import { ArticleEndpoint } from "./ArticleEndpoint";
import axios, { AxiosInstance, CancelToken, CancelTokenSource } from "axios";
import { ArticleSearchRequest } from "../requests/ArticleSearchRequest";
import { Endpoint } from "@webion/api-core";

export class ArticlesEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly language: string,
  ) {
    super(client);
  }

  get url() {
    return `/articles/${this.language}`;
  }

  withId(webId: number) {
    return new ArticleEndpoint(this.client, this.language, webId);
  }

  async filter(request?: ArticleSearchRequest, cancelToken?: CancelToken) {

    return this.client
      .get<BlogArticle[]>(this.url, {
        cancelToken: cancelToken,
        params: request,
      })
  }
}
