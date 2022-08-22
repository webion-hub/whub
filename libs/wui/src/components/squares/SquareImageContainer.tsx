import { SquareContainer, SquareContainerProps } from "./SquareContainer"

export interface SquareImageContainerProps extends SquareContainerProps {
  readonly src: string,
}

export function SquareImageContainer(props: SquareImageContainerProps) {
  const { sx, src, ...others } = props

  return (
    <SquareContainer
      {...others}
      sx={{
        ...sx,
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
  )
}
