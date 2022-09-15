import { ProductsList } from "@whub/wshop-ui"
import { Page, Section } from "@whub/wui"
import { useSearchParams } from "react-router-dom"

export function ProductsPage() {
  const [params] = useSearchParams()

  const filter = params.get('filter') ?? ''
  const category = params.get('category') ?? ''

  return (
    <Page sx={{ padding: 1 }}>
      <Section sx={{ padding: 0 }}>
        <ProductsList
          filter={filter}
          category={category}
        />
      </Section>
    </Page>
  )
}
