import { useMediaQuery, useTheme } from "@mui/material";
import { useShopApi } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { ProductComponent } from "@whub/wshop-ui";
import { FullScreenLoading, MaybeShow, Page, Section } from "@whub/wui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function ProductPage() {
  const params = useParams()
  const productId = params['id']
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product>()

  const shopApi = useShopApi()

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = () => {
    if(!productId)
      return

    setLoading(true)
    shopApi.products
      .withId(parseInt(productId))
      .load()
      .then(res => {
        setProduct(res.data)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Page
      sx={{ padding: 1 }}
    >
      <Section id="" sx={{ padding: 0 }}>
        <FullScreenLoading loading={loading}/>
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
      </Section>
    </Page>
  )
}


