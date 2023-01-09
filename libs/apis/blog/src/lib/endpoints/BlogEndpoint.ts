import { Endpoint } from "@whub/apis-core";
import { CreateArticleRequest } from "../requests/CreateArticleRequest";
import { ArticlesEndpoint } from "./ArticlesEndpoint";
import { AxiosResponse } from "axios";
import { CreateArticleResponse } from "../response/CreateArticleResponse";

export class BlogEndpoint extends Endpoint {
  get url() {
    return '/articles';
  }

  forLanguage(lang: string) {
    return new ArticlesEndpoint(this.client, lang);
  }

  async create(request: CreateArticleRequest) {
    return this.client
      .post<CreateArticleRequest, AxiosResponse<CreateArticleResponse>>(this.url, request)
  }
}
