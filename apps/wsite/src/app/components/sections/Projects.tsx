import { ArrowLeftRounded, ArrowRightRounded, RadioButtonCheckedRounded, RadioButtonUncheckedRounded } from "@mui/icons-material";
import { Box, ButtonBase, Card, CardContent, CardMedia, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { Img, useNavigator } from "@whub/wui";
import { ReactNode, useEffect, useRef, useState } from "react";
//import { Slideshow } from "@whub/wui";
import { useTranslation } from "react-i18next";
import { BehaviorSubject, debounceTime, fromEvent, throttleTime } from "rxjs";

interface ProjectCardProps {
  readonly src: string,
  readonly description: string,
  readonly selected: boolean
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Stack
      direction="column"
      spacing={4}
    >
      <Img
        src={props.src}
        sx={{
           width: '100%',
           borderRadius: 4,
        }}
      />
      <Typography
        color="text.secondary"
        sx={{
          opacity: props.selected ? 1 : 0,
          transition: '0.25s opacity'
        }}
      >
        {props.description}
      </Typography>
    </Stack>
  )
}

export default function Projects() {
  const { t } = useTranslation();
  const theme = useTheme()
  const reduceSlideshow = useMediaQuery(theme.breakpoints.down("md"));

  const slideshowImagesProps = [
    {
      img: "assets/images/kaire.webp",
      url: "https://kaire-automation.it/",
      label: t("project-3-description"),
    },
    {
      img: "assets/images/mentorz.webp",
      url: "https://mail.webion.it/sites/mentorz/",
      label: t("project-1-description"),
    },
    {
      img: "assets/images/yoga.webp",
      url: "https://it.yogacorfuholidays.com/",
      label: t("project-2-description"),
    },
  ]

  const items: SlideshowItem[] = slideshowImagesProps.map(img => {
    return {
      onClick: () => window.open(img.url, '_blank'),
      item: (selected: boolean) =>
        <ProjectCard
          selected={selected}
          src={img.img}
          description={img.label}
        />
    }
  })

  return (
    <Box sx={{ height: "fit-content" }}>
      <Typography
        variant="h2"
        textAlign="center"
        color="white"
        sx={{ marginBottom: 5 }}
      >
        {t("projects-title")}
      </Typography>
      <Slideshow
        startIndex={1}
        itemWidth={reduceSlideshow ? 300 : 600}
        containerWidth="100vw"
        items={items}
      />
    </Box>
  );
}


interface SlideshowItem {
  readonly item: (selected: boolean) => ReactNode,
  readonly onClick: (e: any) => void
}


interface SlideshowProps {
  readonly items: SlideshowItem[],
  readonly itemWidth: number,
  readonly containerWidth: number | string,
  readonly startIndex: number
}

function Slideshow(props: SlideshowProps) {
  const ref = useRef<HTMLDivElement>()
  const selection$ = useRef(new BehaviorSubject(0))
  const [index, setIndex] = useState(props.startIndex)
  const [indexToZoom, setIndexToZoom] = useState(0)

  useEffect(() => {
    const sub = selection$
      .current
      .pipe(debounceTime(10))
      .subscribe(res => {
        setIndexToZoom(res)
      })

    return () => sub.unsubscribe()
  }, [ref.current])

  useEffect(() => {
    if(!ref.current)
      return

    const nodes = ref.current.childNodes;

    (nodes[index + 1] as HTMLDivElement).scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth'
    })
  }, [index])

  const getWidth = () => {
    const isAString = typeof props.containerWidth === 'string'

    return isAString
      ? window.innerWidth * Number(props.containerWidth.slice(0, -2)) / 100
      : props.containerWidth
  }

  const getIcon = (i: number) => {
    return i === indexToZoom
      ? <RadioButtonCheckedRounded fontSize="small"/>
      : <RadioButtonUncheckedRounded fontSize="small"/>
  }

  const next = () => {
    setIndex(
      index === props.items.length - 1
        ? 0
        : index + 1
    )
  }

  const back = () => {
    setIndex(
      index === 0
        ? props.items.length - 1
        : index - 1
    )
  }

  const getScale = (i: number) => {
    return i === indexToZoom
      ? 'scale(1)'
      : 'scale(0.75)'
  }

  const getOpacity = (i: number) => {
    return i === indexToZoom
      ? '1'
      : '0.75'
  }

  const onScroll = (e: any) => {
    const x = ref.current?.scrollLeft ?? 0
    const index = Math.round(x / props.itemWidth)

    selection$.current.next(index)
  }

  const getSide = () => {
    const sideWidth = (getWidth() / 2) - (props.itemWidth / 2)

    return (
      <Box
        sx={{
          display: 'flex',
          width: sideWidth,
          flex: `0 0 ${sideWidth}px`,
        }}
      />
    )
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
    >
      <Box
        ref={ref}
        onScroll={onScroll}
        sx={{
          display: 'flex',
          width: props.containerWidth,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPadding: '128px',
          "::-webkit-scrollbar": {
            display: 'none'
          }
        }}
      >
        {getSide()}
        {
          props.items.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                width: props.itemWidth,
                flex: `0 0 ${props.itemWidth}px`,
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'center',
                "& > *": {
                  transition: '0.25s transform, 0.25s opacity',
                  transform: getScale(i),
                  opacity: getOpacity(i)
                }
              }}
            >
              <Box
                sx={{
                  width: props.itemWidth,
                  "&:hover": {
                    cursor: 'pointer'
                  }
                }}
                onClick={(e) => {
                  i === indexToZoom
                    ? item.onClick(e)
                    : setIndex(i)
                }}
              >
                {item.item(i === indexToZoom)}
              </Box>
            </Box>
          ))
        }
        {getSide()}
      </Box>
      <Stack
        direction="row"
        sx={{
          "& > *": {
            color: 'rgba(255, 255, 255, 0.2) !important'
          }
        }}
      >
        <IconButton
          size="small"
          onClick={back}
        >
          <ArrowLeftRounded/>
        </IconButton>
        {
          props.items.map((_, i) => (
            <IconButton
              key={i}
              sx={{
                width: 34,
                height: 34
              }}
              onClick={() => setIndex(i)}
              size="small"
            >
              {getIcon(i)}
            </IconButton>
          ))
        }
        <IconButton
          size="small"
          onClick={next}
        >
          <ArrowRightRounded/>
        </IconButton>
      </Stack>
    </Stack>
  )
}
