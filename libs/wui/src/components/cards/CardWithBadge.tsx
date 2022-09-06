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
          "@keyframes grow-badge": {
            "0%": {
              transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(0)`,
            },
            "40%": {
              transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(1.2)`,
            },
            "60%": {
              transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(0.8)`,
            },
            "80%": {
              transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(1.2)`,
            },
            "100%": {
              transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(1)`,
            },
          },
          width: size,
          height: size,
          transformOrigin: 'center',
          transform: `translate(${props.badgeXOffset}px, ${props.badgeYOffset}px) scale(0)`,
          borderRadius: "100%",
          animation: props.animateBadge
            ? `grow-badge ${props.animationTimeout}ms ease-in-out forwards`
            : '',
          animationDelay: `${props.animationDelay}ms`,
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
