import { Product } from "@whub/wshop-ui";
import { Page, Section } from "@whub/wui";
import { useParams } from "react-router-dom";


export function ProductPage() {
  const params = useParams()
  const productId = params['id']

  return (
    <Page
      sx={{ padding: 1 }}
    >
      <Section id="" sx={{ padding: 0 }}>
        <Product productId={productId}/>
      </Section>
    </Page>
  )
}


