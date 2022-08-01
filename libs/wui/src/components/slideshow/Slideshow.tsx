import { useState, useRef } from "react";
import { Button, Grid, SxProps, Theme, Typography, Box } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { SlideshowImage } from "./SlideshowImage";
import { Responser } from "../conditional_components/Responser";

export interface SlideshowImagesProps {
  readonly img: string;
  readonly url: string;
  readonly label: string;
}

export interface SlideshowProps {
  readonly iconSx: SxProps<Theme>;
  readonly imagesProps: SlideshowImagesProps[];
}

export function Slideshow(props: SlideshowProps) {
  const [imageIdx, setImageIdx] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = (prev = false) => {
    if (!ref.current)
      return

    const backOrNextFactor = prev ? -1 : 1
    const nextImageIdx = imageIdx + backOrNextFactor;

    const inRangeIdx = nextImageIdx < 0 
      ? nextImageIdx + props.imagesProps.length 
      : nextImageIdx % props.imagesProps.length;

    setImageIdx(inRangeIdx);

    ref.current.scrollLeft = (ref.current.clientWidth + 1) * inRangeIdx;
  };

  const AlternativeChildren =
    <Box  sx={{ height: "350px", maxWidth: 900 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          wrap="nowrap"
          width="90%"
          sx={{ overflowX: "hidden", scrollBehavior: "smooth" }}
          ref={ref}
        >
          {props.imagesProps.map((obj, i) => (
            <SlideshowImage
              img={obj.img}
              url={obj.url}
              key={"slideImage" + i}
            ></SlideshowImage>
          ))}
        </Grid>
        <Grid container width="100%" justifyContent="space-between">
          <Button
            onClick={() => handleScroll(true)}
            sx={{ margin: "auto 0px" }}
          >
            <ChevronLeftRoundedIcon sx={props.iconSx} />
          </Button>
          <Button
            onClick={() => handleScroll()}
            sx={{ margin: "auto 0px" }}
          >
            <ChevronRightRoundedIcon sx={props.iconSx} />
          </Button>
        </Grid>
      </Grid>
      <Typography
        textAlign="center"
        color="text.primary"
        sx={{ margin: "20px auto", width: "80%" }}
      >
        {props.imagesProps[imageIdx].label}
      </Typography>
    </Box>

  return (
    <Responser
      type="upper"
      size="sm"
      alternativeChildren={AlternativeChildren}
    >
      <Box sx={{ maxWidth: 1600, width: '100%', marginInline: 'auto' }}>
        <Grid 
          container 
          alignItems="center" 
          justifyContent="center"
        >
          <Button
            onClick={() => handleScroll(true)}
            sx={{ margin: "auto 0px" }}
          >
            <ChevronLeftRoundedIcon sx={{ ...props.iconSx, fontSize: "70px" }} />
          </Button>
          <Grid
            container
            wrap="nowrap"
            width="60%"
            sx={{ overflowX: "hidden", scrollBehavior: "smooth" }}
            ref={ref}
          >
            {props.imagesProps.map((obj, i) => (
              <SlideshowImage
                img={obj.img}
                url={obj.url}
                key={"slideImage" + i}
              ></SlideshowImage>
            ))}
          </Grid>
          <Button 
            onClick={() => handleScroll()} 
            sx={{ margin: "auto 0px" }}
          >
            <ChevronRightRoundedIcon sx={{ ...props.iconSx, fontSize: "70px" }} />
          </Button>
        </Grid>
        <Typography
          textAlign="center"
          color="text.primary"
          sx={{ margin: "20px auto", width: "60%" }}
        >
          {props.imagesProps[imageIdx].label}
        </Typography>
      </Box>
    </Responser>
  );
}
