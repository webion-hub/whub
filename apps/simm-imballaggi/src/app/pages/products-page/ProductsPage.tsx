import { LinearProgress, Stack } from "@mui/material"
import { useShopApi } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { ProductCard } from "@whub/wshop-ui"
import { MaybeShow, Page, Section, Sections } from "@whub/wui"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function ProductsPage() {
  const shopApi = useShopApi()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const take = 20
  const [page, setPage] = useState(0)

  const filter = params?.['filter'] ?? ''
  const category = params?.['category'] ?? ''

  useEffect(() => {
    setLoading(true)

    shopApi.products
      .search
      .filter({
        query: filter,
        category: category,
        skip: page * take,
        take: take,
      })
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Page>
      <Section>
        <MaybeShow
          show={!loading}
          alternativeChildren={<LinearProgress/>}
        >
          <Stack
            direction="column"
          >
            <Stack
              direction="row"
              flexWrap='wrap'
              justifyContent="center"
              sx={{
                "& > *": {
                  margin: 1
                }
              }}
            >
              {
                [...Array(20)].map((p, i) => {
                  if(!products?.[0])
                    return null

                  return(
                  <ProductCard
                    key={i}
                    product={products?.[0]}
                  />)
                })
              }
            </Stack>
          </Stack>
        </MaybeShow>
      </Section>
    </Page>
  )
}
