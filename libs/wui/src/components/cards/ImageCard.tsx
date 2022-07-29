import { SxProps, Theme } from "@mui/system";
import React from "react";
import { Img } from "../Img";
import { BaseCard } from "./BaseCard";

export interface ImageCardProps {
  readonly sx?: SxProps<Theme>;
  readonly title: string;
  readonly paragraph: string;
  readonly src: string;
  readonly width?: number;
  readonly height?: number;
  readonly maxWidth?: string;
}

export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>((props, ref) => {
  return (
    <BaseCard
      ref={ref}
      title={props.title}
      paragraph={props.paragraph}
      sx={props.sx}
      width={props.width}
      maxWidth={props.maxWidth}
      height={props.height}
    >
      <Img 
        src={props.src} 
        sx={{ height: 100 }}
      />
    </BaseCard>
  );
})

ImageCard.defaultProps = {
  width: 350,
  height: 400,
  maxWidth: "95%"
}
