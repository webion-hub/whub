import { ArrowLeftRounded, ArrowRightRounded, RadioButtonCheckedRounded, RadioButtonUncheckedRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BehaviorSubject, debounceTime } from "rxjs";
import { useOnScreen } from "../hooks/useOnScreen";

export interface SlideshowItem {
  readonly item: (selected: boolean) => ReactNode,
  readonly onClick?: (e: any) => void
}

interface Width {
  readonly width: string | number,
  readonly maxWidth?: number
}

export interface SlideshowProps {
  readonly items: SlideshowItem[],
  readonly itemWidth: Width,
  readonly containerWidth: Width,
  readonly color?: string,
}

export function Slideshow(props: SlideshowProps) {
  const ref = useRef<HTMLDivElement>()
  const inView = useOnScreen(ref)
  const selection$ = useRef(new BehaviorSubject(0))
  const [index, setIndex] = useState(0)
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
    if(!ref.current || !inView)
      return

    const nodes = ref.current.childNodes;

    (nodes[index + 1] as HTMLDivElement)?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth'
    })
  }, [index])

  const getWidth = (width: Width) => {
    const isAString = typeof width.width === 'string'

    const widthPrep = isAString
      ? window.innerWidth * Number(width.width.slice(0, -2)) / 100
      : width.width

    if(!width.maxWidth)
      return widthPrep

    return widthPrep > width.maxWidth
      ? width.maxWidth
      : widthPrep
  }

  const prepContainerWidth = getWidth(props.containerWidth)
  const prepItemWidth = getWidth(props.itemWidth)



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
    const index = Math.round(x / prepItemWidth)

    selection$.current.next(index)
  }

  const getSide = () => {
    const sideWidth = (prepContainerWidth / 2) - (prepItemWidth / 2)

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
          width: props.containerWidth.width,
          maxWidth: props.containerWidth.maxWidth,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
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
                    cursor: i === indexToZoom && item.onClick || i !== indexToZoom
                      ? 'pointer'
                      : 'cursor'
                  }
                }}
                onClick={(e) => {
                  i === indexToZoom
                    ? item.onClick?.(e)
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
            color: props.color ?? 'rgba(255, 255, 255, 0.2) !important'
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
