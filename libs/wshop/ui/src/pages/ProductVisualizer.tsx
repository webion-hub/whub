import { Box, LinearProgress, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useShop } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { MaybeShow, useLayout } from "@whub/wui";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import { ProductComponent } from "../components/ProductComponent";

interface ProductProps {
  readonly productId: number,
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
}

export function ProductGetter(props: ProductGetter) {
  const { setLoading } = useLayout()
  const shopApi = useShop().api
  const endpoint = shopApi.products.withId(props.productId)

  const { data } = useSWR(endpoint.url, async () => {
    const res = await endpoint.load()
    return res.data
  })

  useEffect(() => {
    if(!data) {
      setLoading(true)
      return
    }

    setLoading(false)
    props.onProductFetch?.(data)
  }, [data])

  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      {props.children(data, !data)}
    </Stack>
  )

}
