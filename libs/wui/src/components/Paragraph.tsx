import { Grid, Typography } from "@mui/material";
import { ChildrenProp } from "@whub/wui";

export interface ParagrapProps {
    readonly title: string,
    readonly children: ChildrenProp,
}

export function Paragraph(props: ParagrapProps) {
  return (
    <Grid
      container
      direction="column"
    >
      <Typography variant="h4">
        {props.title}
      </Typography>
      {props.children}
    </Grid>
  )
}