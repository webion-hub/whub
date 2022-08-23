import { AxiosInstance } from "axios";
import { Endpoint } from "../abstractions/Endpoint";
import { Category } from "../model/Category";
import { UpdateCategoryRequest } from "../requests/UpdateCategoryRequest";

export class CategoryEndpoint extends Endpoint {
  constructor (
    client: AxiosInstance,
    private readonly categoryId: number,
  ) {
    super(client)
  }
  
  get url(): string {
    return `shop/categories/${this.categoryId}`;
  }


  load() {
    return this.client.get<Category>(this.url);
  }

  delete() {
    return this.client.delete(this.url);
  }

  update(request: UpdateCategoryRequest) {
    return this.client.put(this.url, request);
  }
}