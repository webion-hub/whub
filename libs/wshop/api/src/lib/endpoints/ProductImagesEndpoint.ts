import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { ProductImageEndpoint } from "./ProductImageEndpoint";
import { Image } from "../model/Image";

export class ProductImagesEndpoint extends Endpoint {
  constructor (
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
  }

  get url() {
    return `products/${this.productId}/images`;
  }


  withId(imageId: number) {
    return new ProductImageEndpoint(
      this.client,
      this.productId,
      imageId
    );
  }

  upload(base64Url: string | Blob) {
    return this.client.post<Image>(this.url + `/from_data_url`, {
      image: base64Url,
    });
  }
}
