import { useMediaQuery, useTheme } from "@mui/material";
import { FooterGrid, FooterGridProps } from "./FooterGrid";

export function FooterRow(props: FooterGridProps) {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    ref: _ref,
    height,
    ...others
  } = props

  return (
    <FooterGrid
      {...others}
      direction={isMd ? "column" : "row"}
      minHeight={isMd ? 'auto' : height}
    >
      {props.children}
    </FooterGrid>
  )
}