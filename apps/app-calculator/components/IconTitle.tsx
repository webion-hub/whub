import { Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { Stack } from "@mui/system"

export interface IconTitleProps {
  readonly Icon: OverridableComponent<any>,
  readonly text: string
}

export function IconTitle(props: IconTitleProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <props.Icon fontSize='large' color='primary'/>
      <Typography
        variant='h4'
      >
        {props.text}
      </Typography>
    </Stack>
  )
}


