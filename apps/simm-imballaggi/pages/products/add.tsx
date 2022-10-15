import { Guards } from "@whub/apis-react";
import { ProductHandler } from "@whub/wshop-ui";
import { Page, Section } from "@whub/wui";

export async function getServerSideProps() {
  return await Guards.isAdmin('/')
}

export default function AddProduct() {
  return (
    <Page>
      <Section>
        <ProductHandler/>
      </Section>
    </Page>
  )
}
