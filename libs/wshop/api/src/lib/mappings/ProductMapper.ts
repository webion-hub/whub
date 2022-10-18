import { ResponseMapper } from "@whub/apis-core";
import { AxiosInstance } from "axios";
import { Product } from "../model/Product";
import { ProductImageMapper } from "./ProductImageMapper";

export class ProductMapper extends ResponseMapper<Product> {
  private readonly imageMapper: ProductImageMapper;

  constructor(client: AxiosInstance) {
    super(client);
    this.imageMapper = new ProductImageMapper(client);
  }

  map(product: Product): Product {
    return {
      ...product,

      attachments: product.attachments?.map(a => ({
        ...a,
        url: this.mapUrl(a.url),
      })),

      images: product.images?.map(i => this.imageMapper.map(i)),
    };
  }
}
