const categoryRoutes = {
  materials: 'Macchine e materiali per proteggere',
  machines: "Macchine per l'imballaggio",
}

export const homeCatergoryUrls = {
  materials: `/products?category=${categoryRoutes.materials}`,
  machines: `/products?category=${categoryRoutes.machines}`,
}
