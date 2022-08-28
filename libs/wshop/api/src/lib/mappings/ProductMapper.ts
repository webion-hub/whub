import { ResponseMapper } from "@whub/apis-core";
import { Product } from "../model/Product";

export class ProductMapper extends ResponseMapper<Product> {
  protected map(product: Product): Product {
    return {
      ...product,

      attachments: product.attachments.map(a => ({
        ...a,
        url: this.mapUrl(a.url),
      })),

      images: product.images.map(i => ({
        ...i,
        url: this.mapUrl(i.url),
      }))
    };
  }
}