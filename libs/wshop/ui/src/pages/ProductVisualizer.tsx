import { Box, LinearProgress, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useShop } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { FullScreenLoading, MaybeShow } from "@whub/wui";
import { ReactNode, useEffect, useState } from "react";
import { ProductComponent } from "../components/ProductComponent";

interface ProductProps {
  readonly productId?: string,
  readonly onProductFetch?: (product: Product) => void,
}

export function ProductVisualizer(props: ProductProps) {
  const productId = props.productId
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down(1100));

  return (
    <ProductGetter
      onProductFetch={props.onProductFetch}
      productId={productId}
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
        (product, loading) =>
          <MaybeShow
            show={!loading}
          >
            {
              product
                ? <ProductComponent
                    product={product}
                    compress={isMobileView}
                  />
                : <></>
            }
          </MaybeShow>
      }
    </ProductGetter>
  )
}

interface ProductGetter extends ProductProps {
  readonly onProductFetch?: (product: Product) => void,
  readonly children: (product?: Product, loading?: boolean) => any,
  readonly loadingComponent?: (loading: boolean) => ReactNode
}

export function ProductGetter(props: ProductGetter) {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product>()

  const shopApi = useShop().api

  useEffect(() => {
    fetchProduct()
  }, [props.productId])

  useEffect(() => {
    if(!product)
      return

    props.onProductFetch?.(product)
  }, [product])

  const fetchProduct = () => {
    if(!props.productId)
      return

    setLoading(true)
    shopApi.products
      .withId(parseInt(props.productId))
      .load()
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      {props.loadingComponent?.(loading)}
      {props.children(product, loading)}
    </Stack>
  )
}
