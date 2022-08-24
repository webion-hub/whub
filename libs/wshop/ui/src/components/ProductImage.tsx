import { Paper, Skeleton, SxProps, Theme } from "@mui/material"
import { Product } from "@whub/wshop-api"
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { useShopApi } from "@whub/apis-react";
import { MaybeShow } from "@whub/wui";

export interface ProductImageProps {
  readonly product: Product,
  readonly size: ResponsiveStyleValue<string | number>,
  readonly sx?: SxProps<Theme>
}

export function ProductImage(props: ProductImageProps) {
  const shopApi = useShopApi()
  const { product, size } = props

  const areNoImages = () => {
    return product.images.length === 0
  }

  const shopProduct = shopApi.products.withId(product.id);
  const images = product.images.map(i =>
    shopProduct.images.withId(i.id)
  )

  const firstImage = images[0];

  return (
    <Paper
      sx={{
        aspectRatio: '1',
        zIndex: 1,
        width: size,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundSiRepeat: 'no-repeat',
        overflow: 'hidden',
        backgroundImage: firstImage && `url(${firstImage?.fullUrl})`,
        ...props.sx,
      }}
    >
      <MaybeShow
        show={!areNoImages()}
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
