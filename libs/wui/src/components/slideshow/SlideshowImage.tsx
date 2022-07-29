import { Img } from "../Img";

export interface SlideshowImageProps {
  readonly src: string;
  readonly link: string;
  readonly visible: number;
  readonly index: number;
}

export function SlideshowImage(props: SlideshowImageProps) {
  return (
    <Img
      src={props.src}
      width="100%"
      sx={{ 
        borderRadius: 2, 
        cursor: "pointer",
      }}
      onClick={() => window.open(props.link, '_blank')}
    />
  );
}
