import { useMediaQuery, useTheme } from "@mui/material";
import { FooterGrid, FooterGridProps } from "./FooterGrid";

export function FooterColumn(props: FooterGridProps) {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    ref: _ref,
    ...others
  } = props

  return (
    <FooterGrid
      {...others}
      direction="column"
      width={isMd ? '100%' : others.width}
    >
      {props.children}
    </FooterGrid>
  )
}
