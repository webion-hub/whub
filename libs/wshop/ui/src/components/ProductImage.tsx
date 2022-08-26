import { ButtonBase, Paper, Skeleton, SxProps, Theme } from "@mui/material"
import { Product } from "@whub/wshop-api"
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { useShopApi } from "@whub/apis-react";
import { MaybeShow, useProgressiveImage } from "@whub/wui";

interface ProductImageBaseProps {
  readonly product?: Product,
  readonly imageIndex?: number,
  readonly maxSize?: ResponsiveStyleValue<string | number>,
  readonly size: ResponsiveStyleValue<string | number>,
  readonly sx?: SxProps<Theme>,
  readonly srcs?: string[], //used for preview
}

interface ProductImageButtonProps extends ProductImageBaseProps {
  readonly component: 'button',
  readonly zoom?: boolean,
  readonly disabled?: boolean,
  readonly selected?: boolean,
  readonly onClick?: () => void,
}


interface ProductImageDefaultProps extends ProductImageBaseProps {
  readonly component?: 'default',
}

type ProductImageProps = ProductImageDefaultProps | ProductImageButtonProps

export function ProductImage(props: ProductImageProps) {
  const shopApi = useShopApi()
  const { product, size, maxSize } = props

  const getImages = () => {
    if(props.srcs)
      return props.srcs

    if(!product)
      return []

    const shopProduct = shopApi.products.withId(product.id);
    return product.images.map(i =>
      shopProduct.images.withId(i.id).fullUrl
    )
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
      component={component}
      disabled={isAButton && props.disabled}
      onClick={isAButton ? props.onClick : undefined}
      sx={{
        zIndex: 1,
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
