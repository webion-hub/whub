import { Endpoint } from "@whub/apis-core";
import { AxiosInstance } from "axios";
import { Attachment } from "../model/Attachment";
import { ProductAttachmentEndpoint } from "./ProductAttachmentEndpoint";

export class ProductAttachmentsEndpoint extends Endpoint {
  constructor(
    client: AxiosInstance,
    private readonly productId: number,
  ) {
    super(client);
  }
  
  get url(): string {
    return `products/${this.productId}/attachments`;
  }

  withId(attachmentId: number) {
    return new ProductAttachmentEndpoint(
      this.client,
      this.productId,
      attachmentId
    );
  }

  upload(file: File) {
    const form = new FormData();
    form.append('attachment', file, file.name);

    return this.client.post<Attachment>(this.url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }
}