export class ShopRoutes {
  static readonly PRODUCTS = '/products'
  static readonly PRODUCT = `${this.PRODUCTS}/:id`
  static readonly PRODUCT_EDIT = `${this.PRODUCT}/edit`
  static readonly PRODUCT_ADD = `${this.PRODUCTS}/add`
  static readonly PRODUCTS_TABLE = `${this.PRODUCTS}/table`

  static getEditRoute(id: string | number) {
    return this.PRODUCT_EDIT.replace(':id', id.toString())
  }

  static getProductRoute(id: string | number) {
    return this.PRODUCT.replace(':id', id.toString())
  }
}
