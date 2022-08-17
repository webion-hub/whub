import { Button, useTheme } from "@mui/material"
import { Img } from "../Img"

export interface AppBarLogoProps {
  readonly src: string,
  readonly href?: string,
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function AppBarLogo(props: AppBarLogoProps) {
  const theme = useTheme()
  const btnPadding = theme.spacing(0.5)
  const appbarPadding = theme.spacing(1)

  return (
    <Button
      onClick={props.onClick}
      href={props.href}
      sx={{
        padding: btnPadding,
        borderRadius: 1,
        minWidth: 'auto'
      }}
    >
      <Img
        src={props.src}
        alt="logo"
        sx={{
          height: `calc(
            ${theme.mixins.toolbar.height}px -
            ${btnPadding} -
            ${btnPadding} -
            ${appbarPadding} -
            ${appbarPadding}
          )`,
        }}
      />
    </Button>
  )
}
