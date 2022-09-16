import { ShopRoutes } from "@whub/wshop-ui"

const categoryRoutes = {
  materials: 'Macchine e materiali per proteggere',
  machines: "Macchine per l'imballaggio",
}

export const homeCatergoryUrls = {
  materials: `${ShopRoutes.PRODUCTS}?category=${categoryRoutes.materials}`,
  machines: `${ShopRoutes.PRODUCTS}?category=${categoryRoutes.machines}`,
}
