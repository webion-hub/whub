import { ProductsList } from "@whub/wshop-ui"
import { Page, Section } from "@whub/wui"
import { useRouter } from "next/router"

export default function ProductsPage() {
  const params = useRouter().query

  const filter = params['filter'] ?? ''
  const category = params['category'] ?? ''

  return (
    <Page sx={{ padding: 1 }}>
      <Section sx={{ padding: 0 }}>
        <ProductsList
          filter={filter as string}
          category={category as string}
        />
      </Section>
    </Page>
  )
}
