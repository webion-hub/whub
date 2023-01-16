import { AxiosInstance } from "axios";
import { BlogArticle } from "../model/BlogArticle";
import { Endpoint } from "@wapi/core";

export class ArticleEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly language: string,
    private readonly webId: number,
  ) { super(client); }

  get url() {
    return `/articles/${this.language}/${this.webId}`;
  }

  load = async () => {
    return this.client
      .get<BlogArticle>(this.url)
  }
}
