import { Endpoint } from "@whub/apis-core";
import { AxiosInstance } from "axios";
import { ProductMapper } from "../mappings/ProductMapper";
import { Product } from "../model/Product";
import { SearchRequest as SearchRequest } from "../requests/SearchRequest";
import { SearchResult } from "../responses/SearchResult";

export class SearchEndpoint extends Endpoint {
  private readonly mapper: ProductMapper;

  constructor (client: AxiosInstance) {
    super(client);
    this.mapper = new ProductMapper(client);
  }

  get url(): string {
    return `shop/products/search`;
  }

  async filter(request: SearchRequest) {
    return this.client
      .get<SearchResult<Product>>(this.url, {
        params: request,
      })
      .then(r => ({
        ...r,
        data: {
          ...r.data,
          results: r.data.results.map(p =>
            this.mapper.map(p)
          ),
        }
      }));
  }
}
