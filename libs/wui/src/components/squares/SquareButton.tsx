import { ButtonBase, Stack, SxProps, Theme, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { ReactNode } from "react"
import { SquareContainer } from "./SquareContainer"

export interface SquareButtonProps {
  readonly children?: ReactNode,
  readonly label?: string,
  readonly size?: number,
  readonly stackSx?: SxProps<Theme>,
  readonly onClick?: () => void,
  readonly onDelete?: () => void,
  readonly icon?: OverridableComponent<any>
}

export function SquareButton(props: SquareButtonProps) {
  return (
    <SquareContainer
      onDelete={props.onDelete}
      size={props.size}
    >
      <ButtonBase
        component='label'
        onClick={props.onClick}
        sx={{
          width: '100%',
          height: '100%',
          ...props.stackSx
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          spacing={1}
          sx={props.stackSx}
        >
          {props.children}
          {props.icon && <props.icon/>}
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
          >
            {props.label}
          </Typography>
        </Stack>
      </ButtonBase>
    </SquareContainer>
  )
}
