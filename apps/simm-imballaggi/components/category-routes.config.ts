import { ShopRoutes } from "@whub/wshop-ui"

export const categoryRoutes = {
  materials: 'Macchine e materiali per proteggere',
  machines: "Macchine per l'imballaggio",
}

export const homeCatergoryUrls = {
  materials: ShopRoutes.products({ category: categoryRoutes.materials }),
  machines: ShopRoutes.products({ category: categoryRoutes.machines }),
}
