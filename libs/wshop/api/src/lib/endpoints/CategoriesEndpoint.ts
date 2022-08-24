import { Endpoint } from "@whub/apis-core";
import {AxiosInstance} from "axios";
import {UpdateCategoryRequest} from "../requests/UpdateCategoryRequest";
import { CategoryEndpoint } from "./CategoryEndpoint";

export class CategoriesEndpoint extends Endpoint {
  constructor(client: AxiosInstance) {
    super(client);
  }

  get url() {
    return 'shop/categories';
  }

  withId(id: number) {
    return new CategoryEndpoint(this.client, id);
  }

  list() {
    return this.client.get<string[]>(this.url);
  }

  create(request: UpdateCategoryRequest) {
    return this.client.post(this.url, request);
  }
}
