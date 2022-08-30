import { AxiosInstance } from "axios";
import { Endpoint } from "@whub/apis-core";
import { ProductImageEndpoint } from "./ProductImageEndpoint";
import { Image } from "../model/Image";
import { UploadImageRequest } from "../requests/UploadImageRequest";
import { ProductImageMapper } from "../mappings/ProductImageMapper";

export class ProductImagesEndpoint extends Endpoint {
  private readonly mapper: ProductImageMapper;

  constructor (
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
    this.mapper = new ProductImageMapper(client);
  }

  get url() {
    return `shop/products/${this.productId}/images`;
  }


  withId(imageId: number) {
    return new ProductImageEndpoint(
      this.client,
      this.productId,
      imageId
    );
  }

  async upload(request: UploadImageRequest) {
    return this.client
      .post<Image>(this.url + `/from_data_url`, request)
      .then(r => this.mapper.mapOne(r));
  }
}
