import { SvgIconComponent } from "@mui/icons-material";
import { Badge, BadgeProps, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React from "react";
import { BaseCard } from "./BaseCard";

export interface CardWithBadgeProps {
  readonly title: string;
  readonly paragraph: string;
  readonly Icon: SvgIconComponent;
  readonly number: number;
  readonly badgeXOffset?: number;
  readonly badgeYOffset?: number;
  readonly sx?: SxProps<Theme>;
  readonly width?: number;
  readonly height?: number;
  readonly BadgeProps?: BadgeProps;
  readonly badgeColor?: string;
}

export const CardWithBadge = React.forwardRef<HTMLDivElement, CardWithBadgeProps>((props, ref) => {
  const size = 28

  return (
    <Badge
      badgeContent={
        <Typography variant="caption">
          {props.number}
        </Typography>
      }
      color="secondary"
      sx={{
        '.MuiBadge-badge': {
          width: size,
          height: size,
          borderRadius: "100%",
          transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px)`,
          boxShadow: theme => `0px 0px 0 5px ${props.badgeColor ?? theme.palette.background.default}`
        },
        justifyContent: 'center'
      }}
      {...props.BadgeProps}
    >
      <BaseCard
        ref={ref}
        title={props.title}
        paragraph={props.paragraph}
        sx={props.sx}
        width={props.width}
        height={props.height}
      >
        <props.Icon fontSize="large"/>
      </BaseCard>
    </Badge>
  );
})

CardWithBadge.defaultProps = {
  width: 290,
  height: 320,
}
