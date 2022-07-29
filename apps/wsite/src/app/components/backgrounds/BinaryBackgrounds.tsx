import { Svg, TextSvg, TspanSvg } from "../SvgComponents/SvgComponents";
import { useEffect, useRef, useState } from "react";
import { UUIDFactory } from "@whub/wui";

export interface BinaryBackgroundProps {
    readonly height: any, 
    readonly elements: any, 
    readonly position: any, 
    readonly sx: any,
}

export default function BinaryBackground(props: BinaryBackgroundProps) {
  const [refresh, setRefresh] = useState(true);
  const mainSvg = useRef()
  
  const columnStep = 14;
  const rowStep = 18;
  const bottomOffset = 2;
  const leftOffset = 6;
  
  const getTextColumn = (x: number, height: any) => {
    return (
      <TextSvg
        key={UUIDFactory.getUUIDFromRandom(Math.random())}
        sx={{
          fontSize: 18,
        }}
        x={x}
        y={rowStep}
        textAnchor="middle"
      >
        {
          [...Array(height)].map((_, i) => (
            <TspanSvg
              key={i}
              sx={{
                ...getAnimation(),
                fontSize: "18px",
                fontFamily: theme => (theme.typography as any)?.fontFamily,
                fill: theme => theme.palette['primary'].main,
              }}
              x={x}
              y={getDigitYPosition(i)}
            >
              {getDigit()}
            </TspanSvg>
          ))
        }
      </TextSvg>
    )
  }
  
  useEffect(() => {
    mainSvg.current = props.elements.map((element: any, key: number) => {
      return getTextColumn(key * columnStep + leftOffset, element)
    })

    setRefresh(!refresh)
  }, [])

  const getWidth = () => props.elements.length * columnStep
  const isPosBottom = () => props.position === "bottom"

  const getAnimation = () => {
    return {
      willChange: "opacity",
      animation: `flicker ${Math.random() + 2}s ease-in-out alternate infinite`,
      animationDelay: `-${Math.random() * 4}s`,
      "@keyframes flicker": {
        "0%": {
          opacity: 0.2,
        },
        "100%": {
          opacity: 0.05,
        },
      },
    }
  }

  const getDigit = () => {
    return Math.random() > .5
      ? 1
      : 0
  }


  const getDigitYPosition = (index: number) => {
    return isPosBottom()
      ? props.height - rowStep * index - bottomOffset
      : rowStep * (index + 1)
  }


  return (
    <Svg
      sx={{...props.sx, userSelect: "none"}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${getWidth()} ${props.height}`}
    >
      {mainSvg.current}
    </Svg>
  )
}

BinaryBackground.defaultProps = {
  elements: [],
  position: 'top',
}