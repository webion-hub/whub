import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { Product } from "../model/Product";
import { UpdateProductRequest } from "../requests/UpdateProductRequest";
import { ProductEndpoint } from "./ProductEndpoint";
import { ProductMapper } from "../mappings/ProductMapper";

export class ProductsEndpoint extends Endpoint {
  private readonly mapper: ProductMapper;

  constructor (client: AxiosInstance) {
    super(client);
    this.mapper = new ProductMapper(client);
  }

  get url() {
    return 'shop/products';
  }


  withId(id: number) {
    return new ProductEndpoint(this.client, id);
  }

  async create(request: UpdateProductRequest) {
    return this.client
      .post<Product>(this.url, request)
      .then(r => this.mapper.mapOne(r));
  }

  async list() {
    return this.client
      .get<Product[]>(this.url)
      .then(r => this.mapper.mapMany(r));
  }
}
