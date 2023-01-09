import { ContactUsApi } from "@whub/apis-contactus";
import { BlogApi } from "@whub/apis/blog";
import { SimpleAuthApi } from "@whub/simple-auth";
import { WShopApi } from "@whub/wshop-api";
import { ShopConfig } from "../contexts/ShopContext";

export interface ServiceContext<T,G> {
  readonly api: T,
  readonly config?: G,
}

export class AppContext {
  static contactUs: ServiceContext<ContactUsApi, unknown>;
  static shop: ServiceContext<WShopApi, Partial<ShopConfig>>;
  static auth: ServiceContext<SimpleAuthApi, unknown>;
  static blog: ServiceContext<BlogApi, unknown>;

  static get shopApi() { return AppContext.shop.api }
  static get contactUsApi() { return AppContext.contactUs.api }
  static get authApi() { return AppContext.auth.api }
  static get blogApi() { return AppContext.blog.api }
}
