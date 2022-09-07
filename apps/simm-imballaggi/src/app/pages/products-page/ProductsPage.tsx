import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material"
import { IconButton, LinearProgress, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useShopApi } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { ProductCard, ProductCategory } from "@whub/wshop-ui"
import { FullScreenLoading, MaybeShow, Page, Section } from "@whub/wui"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export function ProductsPage() {
  const theme = useTheme()
  const isXl = useMediaQuery(theme.breakpoints.up("xl"))
  const isMd = useMediaQuery(theme.breakpoints.up("md"))
  const shopApi = useShopApi()
  const [params] = useSearchParams()

  const filter = params.get('filter') ?? ''
  const category = params.get('category') ?? ''

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)

  const getTake = () => {
    if(isXl)
      return 10

    if(isMd)
      return 12

    return 10
  }

  const take = getTake()
  const totalPages = Math.floor(totalProducts / take)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(0)
  }, [filter, category])

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
      .then(res => {
        setProducts(res.data.results)
        setTotalProducts(res.data.totalResults)
      })
      .finally(() => setLoading(false))
  }, [filter, category, page, take])


  return (
    <Page sx={{ padding: 1 }}>
      <Section sx={{ padding: 0 }}>
        <FullScreenLoading loading={loading}/>
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            width: '100%',
            marginTop: { xs: 10, md: 0}
          }}
        >
          <ProductCategory categoryName={category} />
          <Stack
            direction="row"
            flexWrap='wrap'
            alignContent="flex-start"
            sx={{
              width: '100%',
              minHeight: {
                xl: 461 * 2,
                lg: 266 * 4,
                md: 266 * 3,
                sm: 266 * 2,
                xs: 266 * 1,
              },
              maxWidth: {
                xl: 266 * 5,
                lg: 266 * 4,
                md: 266 * 3,
                sm: 266 * 2,
                xs: 266 * 1,
              },
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <IconButton
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftRounded/>
            </IconButton>
            <Typography
              sx={{
                width: '100%',
                maxWidth: 300
              }}
              align="center"
            >
              Pagina {page + 1} / {Math.ceil(totalProducts / take)}
            </Typography>
            <IconButton
              disabled={totalPages === page}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightRounded/>
            </IconButton>
          </Stack>
        </Stack>
      </Section>
    </Page>
  )
}
