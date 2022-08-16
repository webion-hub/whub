import { Grid, Paper, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { BaseProps } from "../../abstractions/props/BaseProps";

export interface BaseCardProps extends BaseProps {
  readonly title: string;
  readonly titleProps?: TypographyProps;
  readonly paragraph: string;
  readonly paragraphProps?: TypographyProps;
  readonly width?: number;
  readonly maxWidth?: string;
  readonly height?: number;
}

export const BaseCard = React.forwardRef<HTMLDivElement, BaseCardProps>((props, ref) => {
  return (
    <Grid
      ref={ref}
      component={Paper}
      container
      direction="column"
      alignItems="center"
      sx={{ 
        width: props.width, 
        height: props.height, 
        maxWidth: props.maxWidth,
        padding: 2,
        ...props.sx 
      }}
    >
      {props.children}
      <Typography
        className="WuiBaseCard-title"
        color="white"
        variant="h4"
        align="center"
        sx={{ marginTop: 3 }}
      >
        {props.title}
      </Typography>
      <Typography
        className="WuiBaseCard-paragraph"
        color="text.secondary"
        variant="subtitle2"
        align="center"
        sx={{ marginTop: 3 }}
      >
        {props.paragraph}
      </Typography>
    </Grid>
  );
})

BaseCard.defaultProps = {
  width: 295,
  height: 350,
  maxWidth: "95%"
}