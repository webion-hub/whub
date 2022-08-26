import { Skeleton } from "@mui/material"
import { useProgressiveImage } from "../../hooks/useProgressiveImage"
import { MaybeShow } from "../conditional_components/MaybeShow"
import { SquareContainer, SquareContainerProps } from "./SquareContainer"

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
