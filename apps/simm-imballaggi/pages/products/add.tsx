import { Guards } from "@whub/apis-react";
import { ProductHandler } from "@whub/wshop-ui";
import { MaybeShow, Page, Section } from "@whub/wui";
import IsAdminGuard from "libs/apis/react/src/client-guards/IsAdminGuard";

export default function Add() {
  return (
    <IsAdminGuard redirectTo="/">
      <AddProduct/>
    </IsAdminGuard>
    )
}

export function AddProduct() {
  return (
    <Page>
      <Section>
        <ProductHandler/>
      </Section>
    </Page>
  )
}
