import { ChildrenProps } from "@wui/core";
import Layout from "@wui/layout/Layout";
import IvyAppBar from "./IvyAppBar";

export default function IvyLayout(props: ChildrenProps) {
  return (
    <Layout
      AppBarComponent={<IvyAppBar/>}
      sx={{ marginTop: 0 }}
    >
      {props.children}
    </Layout>
  )
}