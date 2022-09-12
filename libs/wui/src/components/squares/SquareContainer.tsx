import { CloseRounded } from "@mui/icons-material"
import { Badge, IconButton, Paper, SxProps } from "@mui/material"
import { Theme } from "@mui/system"
import { ChildrenProp } from "../../abstractions/props/ChildrenProps"

export interface SquareContainerProps {
  readonly sx?: SxProps<Theme>,
  readonly children?: ChildrenProp,
  readonly onDelete?: () => void,
}

export function SquareContainer(props: SquareContainerProps) {
  const squarePaper = (
    <Paper
      sx={{
        ...props.sx,
        width: 96,
        height: 96,
      }}
    >
      {props.children}
    </Paper>
  )

  if(!props.onDelete)
    return squarePaper

  return (
    <Badge
      color="secondary"
      sx={{
        '.MuiBadge-badge': {
          transform: 'translate(-4px, 4px) scale(.75)',
          width: 24,
          height: 24,
          borderRadius: '100%'
        }
      }}
      badgeContent={
        <IconButton
          size="small"
          color="secondary"
          onClick={props.onDelete}
        >
          <CloseRounded
            fontSize="small"
            sx={{ color: '#fff' }}
          />
        </IconButton>
      }
    >
      {squarePaper}
    </Badge>
  )
}
