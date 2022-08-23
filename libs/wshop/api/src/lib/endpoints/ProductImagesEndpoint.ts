import { AxiosInstance } from "axios";
import { Endpoint } from "../abstractions/Endpoint";
import { Image } from "../model/Image";
import { ProductImageEndpoint } from "./ProductImageEndpoint";

export class ProductImagesEndpoint extends Endpoint {
  constructor (
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
  }

  get url() {
    return `shop/products/${this.productId}/images`
  };


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
