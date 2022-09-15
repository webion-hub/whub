import { TableProducts } from "@whub/wshop-ui";
import { Page } from "@whub/wui";


export function TableProductsPage() {
  return (
    <Page sx={{
      padding: 1,
      marginTop: { xs: 16, md: 8 },
    }}>
      <TableProducts/>
    </Page>
  )
}


