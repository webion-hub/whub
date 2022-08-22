import { AxiosInstance } from "axios";
import { Image } from "../model/image";
import { ProductImageEndpoint } from "./ProductImageEndpoint";

export class ProductImagesEndpoint {
  private get url() {
    return `shop/products/${this.productId}/images`
  };

  constructor (
    private readonly client: AxiosInstance,
    private readonly productId: number,
  ) {}

  withId(imageId: number) {
    return new ProductImageEndpoint(
      this.client,
      this.productId,
      imageId
    );
  }

  upload(base64Url: string | Blob) {
    return this.client.post<Image>(this.url, base64Url);
  }
}
