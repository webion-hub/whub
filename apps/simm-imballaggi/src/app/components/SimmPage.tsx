import { useTheme } from "@mui/material";
import { Page, PageProps } from "@whub/wui";

export function SimmPage(props: PageProps) {
  const theme = useTheme()

  return (
    <Page
      {...props}
      sx={{
        marginTop: {
          xs: `calc(${theme.mixins.toolbar.height}px + ${theme.mixins.toolbar.height}px)`,
          md: `${theme.mixins.toolbar.height}px`
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Page>
  )
}
