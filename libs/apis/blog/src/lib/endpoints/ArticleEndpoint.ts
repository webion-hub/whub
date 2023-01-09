import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { BlogArticle } from "../model/BlogArticle";

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
