import { ProductVisualizer } from "@whub/wshop-ui";
import { Page, Section } from "@whub/wui";
import { SimmLayoutWithCategories, useProductLayout } from "../../components/layout/SimmLayoutWithCategories";
import { useRouter } from "next/router";


export default function ProductPage() {
  const params = useRouter().query
  const { setCategory } = useProductLayout()
  const productId = params['productId'] as string

  return (
    <Page>
      <Section
        sx={{ padding: 0 }}
      >
        <ProductVisualizer
          productId={productId}
          onProductFetch={p => setCategory(p?.category.name ?? '')}
        />
      </Section>
    </Page>
  )
}

ProductPage.Layout = SimmLayoutWithCategories
