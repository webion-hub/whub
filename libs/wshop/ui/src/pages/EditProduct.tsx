import { useShop } from "@whub/apis-react"
import { FullScreenLoading, Page, Section } from "@whub/wui"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PreviewProduct, ProductHandler } from "../components/ProductHandler"
import { ProductUtils } from "../lib/ProductUtils"

export function EditProduct() {
  const params = useParams()
  const productId = params['id']

  const [loading, setLoading] = useState(false)
  const [previewProduct, setPreviewProduct] = useState<PreviewProduct>()

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
      .then(async res => {
        const product = await ProductUtils.prepareForUI(shopApi, res.data)
        setPreviewProduct(product)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Page>
      <Section>
      <FullScreenLoading loading={loading}/>
        {
          previewProduct
            ? <ProductHandler
                mode='update'
                previewProduct={previewProduct}
              />
            : <></>
        }
      </Section>
    </Page>
  )
}
