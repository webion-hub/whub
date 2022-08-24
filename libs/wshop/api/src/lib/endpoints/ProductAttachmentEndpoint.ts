import { Endpoint } from "@whub/apis-core";
import { AxiosInstance } from "axios";

export class ProductAttachmentEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
    private readonly attachmentId: number,
  ) {
    super(client);
  }


  get url(): string {
    return `products/${this.productId}/attachments/${this.attachmentId}`;
  }

  delete() {
    return this.client.delete<void>(this.url);
  }
}