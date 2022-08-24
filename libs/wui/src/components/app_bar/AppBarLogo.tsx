import { Button, SxProps, Theme, Typography, useTheme } from "@mui/material"
import { MaybeShow } from "../conditional_components/MaybeShow"
import { Img } from "../Img"

export interface AppBarLogoProps {
  readonly sx?: SxProps<Theme>,
  readonly buttonSx?: SxProps<Theme>,
  readonly label?: string,
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
        minWidth: 'auto',
        ...props.buttonSx
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
          ...props.sx
        }}
      />
      <MaybeShow
        show={!!props.label}
      >
        <Typography
          color="textPrimary"
          sx={{ paddingLeft: 1 }}
          variant="h5"
        >
          {props.label}
        </Typography>
      </MaybeShow>
    </Button>
  )
}
