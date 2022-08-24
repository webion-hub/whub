import { Endpoint } from "@whub/apis-core";

export class ProductAttachmentsRepository extends Endpoint {
  get url(): string {
    return 'products'
  }

}