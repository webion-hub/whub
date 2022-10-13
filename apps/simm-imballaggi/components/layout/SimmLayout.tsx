import { useTheme } from "@mui/material"
import { Layout, Utils } from "@whub/wui"
import { ReactNode } from "react"
import SimmAppbar from "./SimmAppBar"
import SimmFooter from "./SimmFooter"

export const SimmLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const appbarHeight = Utils.getWidth(theme.mixins.toolbar.height ?? 0)

  return (
    <Layout
      AppBarComponent={<SimmAppbar />}
      FooterComponent={<SimmFooter />}
      sx={{
        marginTop: {
          xs: `calc(${appbarHeight} + ${appbarHeight})`,
          md: appbarHeight,
        }
      }}
    >
      {children}
    </Layout>
  )
}
