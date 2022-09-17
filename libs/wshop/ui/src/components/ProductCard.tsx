import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import { useShop } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { MaybeShow, useNavigator, useProgressiveImage } from "@whub/wui"
import { useTranslation } from "react-i18next"
import { ProductUtils } from "../lib/ProductUtils"
import parse from 'html-react-parser';
import { ShopRoutes } from "../lib/ShopRoutes"

export interface ProductCardProps {
  readonly product: Product,
}

export function ProductCard(props: ProductCardProps) {
  const { clickNavigate } = useNavigator()
  const { t } = useTranslation()

  const images = ProductUtils.getImages(props.product).map(i => i.url)
  const firstImage = images?.[0]

  const { loading, srcLoaded } = useProgressiveImage(firstImage)
  const noImages = !srcLoaded

  const size = 250

  const productUrl = ShopRoutes.getProductRoute(props.product.id)

  return (
    <Card sx={{ maxWidth: size }}>
      <CardActionArea
        href={productUrl}
        onClick={clickNavigate(productUrl)}
      >
        <MaybeShow
          show={!loading}
          alternativeChildren={
            <Skeleton
              variant="rectangular"
              sx={{
                width: size,
                height: size,
                aspectRatio: '1',
              }}
            />
          }
        >
          <CardMedia
            component="img"
            image={srcLoaded ?? ''}
            sx={{
              width: size,
              height: size,
              opacity: noImages ? 0 : 1
            }}
          />
        </MaybeShow>
        <CardContent sx={{ height: 145}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {props.product.name}
          </Typography>
          <Typography
            component="span"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              "& *": {
                display: 'inline'
              },
            }}
          >
            {parse(props.product.description ?? '')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          href={productUrl}
          onClick={clickNavigate(productUrl)}
        >
          {t('see')}
        </Button>
      </CardActions>
    </Card>
  )
}
