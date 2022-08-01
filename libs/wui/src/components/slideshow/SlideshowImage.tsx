import { Img } from "../Img";

export interface SlideshowImageProps {
  readonly img: string,
  readonly url: string,
}

export function SlideshowImage(props: SlideshowImageProps) {
  return (
    <Img
      draggable="false"
      src={props.img}
      width="100%"
      sx={{
        userDrag: "none", 
        userSelect: "none",
        borderRadius: 2, 
        cursor: "pointer",
      }}
      onClick={() => window.open(props.url, '_blank')}
    />
  );
}
