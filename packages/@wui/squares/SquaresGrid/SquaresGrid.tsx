import { Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

export interface SquaresGridProps<T> {
  readonly title?: string,
  readonly elements: T[],
  readonly firstElement?: ReactNode,
  readonly children: (e: T) => ReactNode
}

export function SquaresGrid<T>(props: SquaresGridProps<T>) {
  return (
    <Stack
      direction="column"
      spacing={0.5}
    >
      <Typography>
        {props.title}
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          marginInline: theme => theme.spacing(-0.5, '!important'),
          "& > *": {
            margin: 0.5
          }
        }}
      >
        {props.firstElement}
        {
          props.elements.map(e => props.children(e))
        }
      </Stack>
    </Stack>
  )
}
