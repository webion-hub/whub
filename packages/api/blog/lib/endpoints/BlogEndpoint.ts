import { Endpoint } from "@webion/api-core";
import { AxiosResponse } from "axios";
import { CreateArticleRequest } from "../requests/CreateArticleRequest";
import { CreateArticleResponse } from "../response/CreateArticleResponse";
import { ArticlesEndpoint } from "./ArticlesEndpoint";

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
