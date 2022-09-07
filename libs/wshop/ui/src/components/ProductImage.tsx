import { Box, ButtonBase, Paper, Skeleton, SxProps, Theme } from "@mui/material"
import { Product, WShopApi } from "@whub/wshop-api"
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { useShopApi } from "@whub/apis-react";
import { Coords, MaybeShow, useProgressiveImage } from "@whub/wui";
import { MouseEvent, useRef, useState } from "react";
import { ProductUtils } from "../lib/ProductUtils";



interface ProductImageBaseProps {
  readonly product?: Product,
  readonly imageIndex?: number,
  readonly maxSize?: ResponsiveStyleValue<string | number>,
  readonly size: ResponsiveStyleValue<string | number>,
  readonly sx?: SxProps<Theme>,
  readonly srcs?: string[], //used for preview
  readonly zoomable?: boolean,
}

interface ProductImageButtonProps extends ProductImageBaseProps {
  readonly component: 'button',
  readonly disabled?: boolean,
  readonly selected?: boolean,
  readonly onClick?: () => void,
}


interface ProductImageDefaultProps extends ProductImageBaseProps {
  readonly component?: 'default',
}

type ProductImageProps = ProductImageDefaultProps | ProductImageButtonProps

export function ProductImage(props: ProductImageProps) {
  const [zoomBox, setZoomBox] = useState({
    x: 0,
    y: 0,
    size: 0
  })
  const [canZoom, setCanZoom] = useState(false)
  const ref = useRef<any>(200)

  const zoom = 2
  const lensSize = 2 * ref.current.offsetWidth / 3
  const { product, size, maxSize } = props

  const getImages = () => {
    if(props.srcs)
      return props.srcs

    if(!product)
      return []

    return ProductUtils.getImages(product).map(i => i.url)
  }

  const getImage = () => {
    return getImages()[props.imageIndex ?? 0]
  }

  const { loading, srcLoaded } = useProgressiveImage(getImage())

  const areNoImages = () => {
    return getImages().length === 0
  }

  const isAButton = props.component === 'button'
  const component = isAButton
    ? ButtonBase
    : 'div'

  return (
    <Paper
      ref={ref}
      component={component}
      disabled={isAButton && props.disabled}
      onClick={isAButton ? props.onClick : undefined}
      onMouseEnter={() => setCanZoom(true)}
      onMouseLeave={() => setCanZoom(false)}
      onMouseMove={(e: MouseEvent) => {
        const rect = ref.current.getBoundingClientRect()
        const xPos = e.clientX - rect.x
        const yPos = e.clientY - rect.y
        const imgSize = ref.current.offsetWidth
        const lensRadius = lensSize / 2

        const getX = () => {
          if (xPos > imgSize - (lensRadius / zoom))
            return imgSize - (lensRadius / zoom)

          if (xPos < lensRadius / zoom)
            return lensRadius / zoom;

          return xPos
        }

        const getY = () => {
          if (yPos > imgSize - (lensRadius / zoom))
            return imgSize - (lensRadius / zoom)

          if (yPos < lensRadius / zoom)
            return lensRadius / zoom

          return yPos
        }

        setZoomBox({
          x: getX(),
          y: getY(),
          size: ref.current.offsetWidth
        })
      }}
      sx={{
        zIndex: 0,
        width: size,
        maxWidth: maxSize,
        aspectRatio: '1',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundSiRepeat: 'no-repeat',
        overflow: 'hidden',
        border: theme => isAButton && props.selected
          ? `1px solid ${theme.palette.primary.main}`
          : undefined,
        backgroundImage: srcLoaded && `url(${srcLoaded})`,
        ...props.sx,
      }}
    >
      <MaybeShow
        show={!!props.zoomable && !loading && canZoom && !!srcLoaded}
      >
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            transform: `translate(${zoomBox.x - lensSize/2}px, ${zoomBox.y - lensSize/2}px)`,
            width: lensSize,
            height: lensSize,
            background: '#fff',
            borderRadius: 2,
            border: '1px solid #777',
            backgroundSize: `${zoomBox.size * zoom}px ${zoomBox.size * zoom}px `,
            backgroundImage: srcLoaded && `url(${srcLoaded})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `-${zoomBox.x * zoom - (lensSize / 2)}px -${zoomBox.y * zoom - (lensSize / 2)}px`,
            pointerEvents: 'none',
          }}
        />
      </MaybeShow>
      <MaybeShow
        show={!areNoImages() && loading}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </MaybeShow>
    </Paper>
  )
}

ProductImage.defautlProps = {
  imageIndex: 0
}
