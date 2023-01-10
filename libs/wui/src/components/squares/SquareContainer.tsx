import { CloseRounded } from "@mui/icons-material"
import { Badge, IconButton, Paper, SxProps } from "@mui/material"
import { Theme } from "@mui/system"
import { ChildrenProp } from "../../abstractions/props/ChildrenProps"

export interface SquareContainerProps {
  readonly sx?: SxProps<Theme>,
  readonly children?: ChildrenProp,
  readonly onDelete?: () => void,
  readonly size?: number,
  readonly aspectRatio?: number,
}

export function SquareContainer(props: SquareContainerProps) {
  const squarePaper = (
    <Paper
      sx={{
        ...props.sx,
        height: props.size,
        width:
          (props.size ?? 1) *
          (props.aspectRatio ?? 1),
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

SquareContainer.defaultProps = {
  size: 96,
  aspectRatio: 1,
}
