import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material"
import { Box, IconButton, LinearProgress, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useShop } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { FullScreenLoading, MaybeShow } from "@whub/wui"
import { ReactNode, useEffect, useRef, useState } from "react"
import { ProductCategory } from "../components/outputs/ProductCategoryOutput"
import { ProductCard } from "../components/ProductCard"

interface ProductListProps {
  readonly filter: string,
  readonly category: string,
}

export function ProductsList(props: ProductListProps) {
  const containerRef = useRef<HTMLDivElement>()

  const [totalElements, setTotalElements] = useState({ tot: 0, rows: 0, cols: 0 })
  const [page, setPage] = useState(0)

  const { filter, category } = props

  const elementMaxWidth = 266
  const elementMinHeight = 461
  const minElements = 10

  useEffect(() => {
    if(!containerRef.current)
      return

    const element = containerRef.current
    const observer = new ResizeObserver(() => {
      const width = element.getBoundingClientRect().width


      const elementPerRow = Math.floor(width / elementMaxWidth)
      const totalElements = Math.ceil(minElements / elementPerRow) * elementPerRow

      setPage(0)
      setTotalElements({
        tot: totalElements,
        rows: elementPerRow,
        cols: Math.ceil(totalElements / elementPerRow),
      })
    })

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [containerRef.current])

  useEffect(() => {
    setPage(0)
  }, [filter, category])

  return (
    <ProductListGetter
      filter={filter}
      category={category}
      page={page}
      take={totalElements.tot}
      loadingComponent={loading =>
        <MaybeShow
          show={loading}
          alternativeChildren={<Box height={4}/>}
        >
          <LinearProgress sx={{width: '100%'}} />
        </MaybeShow>
      }
    >
      {
        (products, totalPages, totalProducts) =>
          <Stack
            ref={containerRef}
            direction="column"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Stack
              direction="row"
              flexWrap='wrap'
              alignContent="flex-start"
              sx={{
                width: '100%',
                minHeight: {
                  xl: elementMinHeight * totalElements.cols,
                  xs: 'auto'
                },
                maxWidth: elementMaxWidth * totalElements.rows,
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
                Pagina {page + 1} / {Math.ceil(totalProducts / totalElements.tot)}
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

  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      {props.loadingComponent?.(loading)}
      {props.children(products, totalPages, totalProducts)}
    </Stack>
  )
}
