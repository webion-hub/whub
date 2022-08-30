import { LinearProgress, Stack } from "@mui/material"
import { useShopApi } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { ProductCard, ProductCategory } from "@whub/wshop-ui"
import { MaybeShow, Page, Section, Sections } from "@whub/wui"
import { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"

const useQuery = () => new URLSearchParams(useLocation().search);

export function ProductsPage() {
  const shopApi = useShopApi()
  const [params] = useSearchParams()

  const filter = params.get('filter') ?? ''
  const category = params.get('category') ?? ''

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const take = 20
  const [page, setPage] = useState(0)



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
      <Section sx={{ padding: 1 }}>
        <MaybeShow
          show={!loading}
          alternativeChildren={<LinearProgress/>}
        >
          <Stack
            direction="column"
            sx={{ width: '100%' }}
          >
            <ProductCategory categoryName={category} />
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
                products.map((p, i) => {
                  if(!products?.[0])
                    return null

                  return(
                  <ProductCard
                    key={i}
                    product={p}
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
