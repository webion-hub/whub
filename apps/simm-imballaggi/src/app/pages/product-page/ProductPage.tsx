import { LinearProgress } from "@mui/material";
import { useShopApi } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { ProductComponent } from "@whub/wshop-ui";
import { MaybeShow, Page } from "@whub/wui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function ProductPage() {
  const params = useParams()
  const productId = params['id']

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
    <Page sx={{ padding: 1 }}>
      <MaybeShow
        show={!loading}
        alternativeChildren={<LinearProgress/>}
      >
        {
          product
            ? <ProductComponent product={product}/>
            : <></>
        }
      </MaybeShow>
    </Page>
  )
}


