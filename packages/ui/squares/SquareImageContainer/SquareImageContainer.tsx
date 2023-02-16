import { Skeleton } from "@mui/material"
import { useProgressiveImage } from "@webion/ui-core"
import MaybeShow from "@webion/ui-components/MaybeShow"
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
      <MaybeShow
        show={loading}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </MaybeShow>
    </SquareContainer>
  )
}
