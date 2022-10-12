import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material"
import { IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useShop } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { FullScreenLoading } from "@whub/wui"
import { ReactNode, useEffect, useState } from "react"
import { ProductCategory } from "../components/outputs/ProductCategoryOutput"
import { ProductCard } from "../components/ProductCard"

interface ProductListProps {
  readonly filter: string,
  readonly category: string,
}

export function ProductsList(props: ProductListProps) {
  const theme = useTheme()
  const isXl = useMediaQuery(theme.breakpoints.up("xl"))
  const isMd = useMediaQuery(theme.breakpoints.up("md"))
  const { filter, category } = props

  const getTake = () => {
    if(isXl)
      return 10

    if(isMd)
      return 12

    return 10
  }

  const take = getTake()
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(0)
  }, [filter, category])

  return (
    <ProductListGetter
      filter={filter}
      category={category}
      page={page}
      take={take}
      loadingComponent={loading => <FullScreenLoading loading={loading}/>}
      noResultComponent={() => 'Nessun risultato'}
    >
      {
        (products, totalPages, totalProducts) =>
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
      }
    </ProductListGetter>
  )
}


export interface ProductListGetterProps extends ProductListProps {
  readonly children: (products: Product[], totPages: number, totProds: number) => any,
  readonly page: number,
  readonly take: number,
  readonly noResultComponent?: () => ReactNode,
  readonly loadingComponent?: (loading: boolean) => ReactNode,
}

export function ProductListGetter(props: ProductListGetterProps) {
  const shopApi = useShop().api

  const {
    filter,
    category,
    take,
    page
  } = props

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)

  const totalPages = Math.floor(totalProducts / take)

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

  if(loading)
    return props.loadingComponent?.(loading)

  if(products.length === 0)
    return props.noResultComponent?.()

  return props.children(products, totalPages, totalProducts)
}
