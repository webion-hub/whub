import {AxiosInstance} from "axios";
import {UpdateCategoryRequest} from "../requests/UpdateCategoryRequest";

export class CategoriesEndpoint {
  constructor(private readonly client: AxiosInstance) {}

  get url() {
    return 'shop/categories';
  }

  list() {
    return this.client.get<string[]>(this.url);
  }

  create(request: UpdateCategoryRequest) {
    return this.client.post(this.url, request);
  }
}
