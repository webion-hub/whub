import { Guards, useShop } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { ProductHandler } from "@whub/wshop-ui"
import { FullScreenLoading, Page, Section } from "@whub/wui"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export async function getServerSideProps() {
  return await Guards.isAdmin('/')
}

export default function EditProduct() {
  const params = useRouter().query
  const productId = params['productId'] as string

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
