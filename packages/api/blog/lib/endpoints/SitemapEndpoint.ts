import { Endpoint } from "@webion/api-core";
import { BlogSitemapItem } from "../response/BlogSitemapItem";

export class SitemapEndpoint extends Endpoint {
  get url() {
    return `/sitemap`;
  }

  async load() {
    return this.client
      .get<BlogSitemapItem[]>(this.url)
  }
}