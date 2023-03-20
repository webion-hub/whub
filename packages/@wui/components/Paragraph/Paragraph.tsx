import { Grid, Typography } from "@mui/material";
import { ChildrenProp } from "@wui/core";

export interface ParagraphProps {
  readonly title: string,
  readonly children: ChildrenProp,
}

export function Paragraph(props: ParagraphProps) {
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
