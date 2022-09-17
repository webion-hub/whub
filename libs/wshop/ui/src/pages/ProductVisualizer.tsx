import { useMediaQuery, useTheme } from "@mui/material";
import { useShop } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { FullScreenLoading, MaybeShow } from "@whub/wui";
import { ReactNode, useEffect, useState } from "react";
import { ProductComponent } from "../components/ProductComponent";

interface ProductProps {
  readonly productId?: string
}

export function ProductVisualizer(props: ProductProps) {
  const productId = props.productId
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ProductGetter
      productId={productId}
      loadingComponent={loading => <FullScreenLoading loading={loading}/>}
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
                    sx={{ marginTop: { xs: 10, md: 0} }}
                  />
                : <></>
            }
          </MaybeShow>
      }
    </ProductGetter>
  )
}

interface ProductGetter extends ProductProps {
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
    <>
      {props.loadingComponent?.(loading)}
      {props.children(product, loading)}
    </>
  )
}
