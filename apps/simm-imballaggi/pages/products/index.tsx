import { ProductsList } from "@whub/wshop-ui"
import { Page, Section } from "@whub/wui"
import { SimmLayoutWithCategories, useProductLayout } from "../../components/layout/SimmLayoutWithCategories"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ProductsPage() {
  const router = useRouter()
  const { setCategory } = useProductLayout()

  useEffect(() => {
    const category = router.query['category'] ?? ''
    setCategory(category as string)
  }, [router])

  if(!router.isReady)
    return null

  const filter = router.query['filter'] ?? ''
  const category = router.query['category'] ?? ''

  return (
    <Page>
      <Section sx={{ padding: 0 }}>
        <ProductsList
          filter={filter as string}
          category={category as string}
        />
      </Section>
    </Page>
  )
}

ProductsPage.Layout = SimmLayoutWithCategories
