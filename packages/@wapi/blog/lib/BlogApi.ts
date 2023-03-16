import { ApiBase } from "@wapi/core";
import { BlogEndpoint } from "./endpoints/BlogEndpoint";
import { SitemapEndpoint } from "./endpoints/SitemapEndpoint";

export class BlogApi extends ApiBase {
  get articles() {
    return new BlogEndpoint(this.client);
  }

  get sitemap() {
    return new SitemapEndpoint(this.client)
  }
}
