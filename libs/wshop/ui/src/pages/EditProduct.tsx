import { useShop } from "@whub/apis-react"
import { FullScreenLoading, Page, Section } from "@whub/wui"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductHandler } from "../components/ProductHandler"

export function EditProduct() {
  const params = useParams()
  const productId = params['id']

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product>()

  const shopApi = useShop().api

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
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <Page>
      <Section>
      <FullScreenLoading loading={loading}/>
        {
          product
            ? <ProductHandler
                mode='update'
                product={product}
              />
            : <></>
        }
      </Section>
    </Page>
  )
}
