import { Skeleton } from "@mui/material"
import { useProgressiveImage } from "@webion/ui-core"
import SquareContainer from "../SquareContainer"
import { SquareContainerProps } from "../SquareContainer/SquareContainer"

export interface SquareImageContainerProps extends SquareContainerProps {
  readonly src: string,
}

export function SquareImageContainer(props: SquareImageContainerProps) {
  const { sx, src, ...others } = props
  const { loading, srcLoaded } = useProgressiveImage(src)


  return (
    <SquareContainer
      {...others}
      sx={{
        ...sx,
        backgroundImage: `url(${srcLoaded})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {
        loading
          ? <Skeleton
              variant="rectangular"
              sx={{
                height: '100%',
                width: '100%',
              }}
            />
          : <></>
      }
    </SquareContainer>
  )
}
