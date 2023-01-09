import { ApiBase } from "@whub/apis-core";
import { BlogEndpoint } from "./endpoints/BlogEndpoint";

export class BlogApi extends ApiBase {
  get articles() {
    return new BlogEndpoint(this.client);
  }
}
