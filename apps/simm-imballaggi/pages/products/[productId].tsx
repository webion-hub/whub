import { ProductVisualizer } from "@whub/wshop-ui";
import { Page, Section } from "@whub/wui";
import { useRouter } from "next/router";


export default function ProductPage(props: any) {
  const params = useRouter().query
  const productId = params['productId'] as string

  return (
    <Page
      sx={{ padding: 1 }}
    >
      <Section id="" sx={{ padding: 0 }}>
        <ProductVisualizer productId={productId}/>
      </Section>
    </Page>
  )
}


export async function getServerSideProps(context) {
  console.log(context)

  return {
    props: {}
  }
}
