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
  readonly animateBadge?: boolean;
  readonly animationDelay?: number;
  readonly animationTimeout?: number;
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
          "@keyframes grow": {
            "0%": {
              transform: `scale(0) translate(${props.badgeXOffset}px, ${props.badgeYOffset}px)`,
            },
            "100%": {
              transform: `scale(1) translate(${props.badgeXOffset}px, ${props.badgeYOffset}px)`,
            },
          },
          width: size,
          height: size,
          transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px)`,
          borderRadius: "100%",
          animation: `grow ${props.animationTimeout}ms cubic-bezier(0.84, 0.01, 0.31, 1.45)`,
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
  animateBadge: false
}
