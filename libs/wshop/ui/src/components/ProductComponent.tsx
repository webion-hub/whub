import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, IconButton, Link, Menu, MenuItem, Skeleton, Stack, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { Category, Product, ProductDetail } from "@whub/wshop-api";
import { useEffect, useState } from "react";
import { ProductImage } from "./ProductImage";
import { FileWithId, GetFormValue, MaybeShow, useNavigator, useProgressiveImage } from "@whub/wui";
import parse from 'html-react-parser';
import { ChevronLeftRounded, ChevronRightRounded, DownloadRounded, ExpandMoreRounded } from "@mui/icons-material";
import { useShopApi } from "@whub/apis-react";
import { ProductUtils } from "../lib/ProductUtils";
import _ from "lodash";

interface ProductComponentBaseProps {
  readonly compress?: boolean,
  readonly sx?: SxProps<Theme>,
}

interface ProductComponentPreviewProps extends ProductComponentBaseProps {
  readonly mode: 'preview',
}

interface ProductComponentDefaultProps extends ProductComponentBaseProps {
  readonly mode?: 'default',
  readonly product: Product,
}

export type ProductComponentProps = ProductComponentPreviewProps | ProductComponentDefaultProps

export function ProductComponent(props: ProductComponentProps) {
  const isAPreview = props.mode === 'preview'
  const product = isAPreview
    ? undefined
    : props.product

  const getStringPlaceholder = (value: string) => {
    return `<span class="placeholder">${value}</span>`
  }

  return (
    <Stack
      direction="column"
      sx={{
        width: '100%',
        ...props.sx
      }}
      spacing={4}
    >
      <ProductField
        name="category"
        mode={props.mode}
        product={product}
        placeholder=''
      >
        {
          (category?: Category) =>
            <Breadcrumbs sx={{ width: '100%' }}>
              {
                (category?.name ?? '')
                  .split('/')
                  .map((v, i, all) => {
                    const isLast = i === all.length - 1

                    return isLast
                      ? <Typography key={i} color="text.primary">{v}</Typography>
                      : <Link
                          key={i}
                          underline="hover"
                          color="inherit"
                          href={`
                            /${all
                              .slice(0, i + 1)
                              .join('/')
                            }`
                          }
                        >
                          {v}
                        </Link>

                  })
              }
            </Breadcrumbs>
        }
      </ProductField>
      <Stack
        direction={props.compress ? 'column' : "row"}
        spacing={props.compress ? 0 : 12}
        alignItems={props.compress ? 'center' : 'flex-start'}
        sx={{
          "& > *": {
            width: props.compress ? '100%' : '50%'
          },
          "& .placeholder": {
            opacity: 0.2,
            fontStyle: 'italic'
          }
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          alignItems={props.compress ? 'center' : 'flex-end'}
        >

          <ProductField
            name="images"
            mode={props.mode}
            product={product}
            placeholder={[] as string[]}
          >
            {
              images =>
                <ProductImagesViewer
                  compress={props.compress}
                  mode={props.mode}
                  product={product}
                  previewImages={images}
                />
            }
          </ProductField>
        </Stack>

        <Stack
          direction="column"
          spacing={2}
          sx={{ padding: 1 }}
        >
          <Stack
            direction="column"
            spacing={4}
          >
            <Stack
              direction="column"
              spacing={1}
            >
              <ProductField
                name="name"
                mode={props.mode}
                product={product}
                placeholder={getStringPlaceholder('Nome')}
              >
                {
                  v =>
                    <Typography
                      variant="h4"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {parse(v)}
                    </Typography>
                }
              </ProductField>
              <ProductField
                name="description"
                mode={props.mode}
                product={product}
                placeholder={getStringPlaceholder('Descrizione')}
              >
                {
                  v =>
                    <Typography component='span'>
                      {parse(v)}
                    </Typography>
                }
              </ProductField>
            </Stack>
            <ProductField
              name="price"
              mode={props.mode}
              product={product}
              placeholder={getStringPlaceholder('Prezzo')}
              suffix="€"
            >
              {
                v =>
                <Typography color="secondary">
                  <strong>
                    {parse(v)}
                  </strong>
                </Typography>
              }
            </ProductField>
          </Stack>
          <Box>
            <Button
              variant="contained"
            >
              Contattaci per ricevere informazioni
            </Button>
          </Box>
          <ProductField
            name="details"
            mode={props.mode}
            product={product}
            placeholder={[] as ProductDetail[]}
          >
            {
              (details: ProductDetail[]) =>
                <Stack
                  direction="column"
                >
                  {
                    details.map((d, i) => (
                      <ProductDetailAccordion
                        key={i}
                        detail={d}
                      />
                    ))
                  }
                </Stack>
            }
          </ProductField>
          <ProductField
            name="attachments"
            mode={props.mode}
            product={product}
            placeholder={[] as File[]}
          >
            {
              a =>
              <ProductAttachmentButtonList
                mode={props.mode}
                product={product}
                attachments={a}
              />
            }
          </ProductField>

          <ProductField
            name="code"
            mode={props.mode}
            product={product}
            placeholder={getStringPlaceholder('Codice prodotto')}
            prefix='Codice: '
          >
            {
              v =>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {parse(v)}
                </Typography>
            }
          </ProductField>
        </Stack>
      </Stack>
      <ProductField
        name="relatedProducts"
        mode={props.mode}
        product={product}
        placeholder={[] as Product[]}
      >
        {
          (products: Product[]) => {
            return <RelatedProducts
              products={[...products]}
              number={props.compress ? 1 : 3}
            />
          }
        }
      </ProductField>
    </Stack>
  )
}


interface RelatedProductsProps {
  readonly products: Product[],
  readonly number: number,
}

function RelatedProducts(props: RelatedProductsProps) {
  const [index, setIndex] = useState(0)
  const noProducts = props.products.length === 0
  const isFirst = index === 0
  const isLast = index === props.products.length - props.number

  const onIncrease = () => {
    const newIndex = index + props.number

    setIndex(
      newIndex > props.products.length - props.number
        ? props.products.length - props.number
        : newIndex
    )
  }

  const onDecrease = () => {
    const newIndex = index - props.number

    setIndex(
      newIndex < 0
        ? 0
        : newIndex
    )
  }

  if(noProducts)
    return null

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Typography variant="h6" > Prodotti correlati </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Box>
          <IconButton
            onClick={() => onDecrease()}
            disabled={isFirst}
            sx={{
              opacity: isFirst
                ? 0
                : 1
            }}
          >
            <ChevronLeftRounded/>
          </IconButton>
        </Box>
        {
          props.products
            .slice(index, index + props.number)
            .map((p, i) => (
              <ProductCard
                key={i}
                product={p}
              />
            ))
        }
        <Box>
          <IconButton
            onClick={() => onIncrease()}
            disabled={isLast}
            sx={{
              opacity: isLast
                ? 0
                : 1
            }}
          >
            <ChevronRightRounded/>
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  )
}


interface ProductCardProps {
  readonly product: Product,
}

function ProductCard(props: ProductCardProps) {
  const { clickNavigate } = useNavigator()
  const shopApi = useShopApi()
  const images = ProductUtils.getImages(shopApi, props.product)
  const firstImage = images?.[0]?.fullUrl

  const { loading, srcLoaded } = useProgressiveImage(firstImage)
  const noImages = !srcLoaded

  const size = 250

  return (
    <Card sx={{ maxWidth: size }}>
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
            overflow: 'hidden'
          }}
        >
          {parse(props.product.description ?? '')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={`/product/${props.product.id}`}
          onClick={clickNavigate(`/product/${props.product.id}`)}
        >
          Vedi
        </Button>
      </CardActions>
    </Card>
  )
}


interface ProductImagesViewerProps {
  readonly mode?: 'default' | 'preview',
  readonly previewImages?: FileWithId<string>[],
  readonly product?: Product
  readonly compress?: boolean
}

function ProductImagesViewer(props: ProductImagesViewerProps) {
  const theme = useTheme()
  const [imageIndex, setImageIndex] = useState(0)

  const sideImageSize = 64
  const imageGap = theme.spacing(1)
  const imageMaxSize = 400

  const isAPreview = props.mode === 'preview'
  const product = isAPreview
    ? undefined
    : props.product

  const images = isAPreview
    ? props.previewImages?.map(i => i.file)
    : undefined

  const getImages = () => {
    const images = isAPreview
      ? props.previewImages?.map(i => i.file)
      : _(props.product?.images).sortBy(i => i.index).value()

    return images ?? []
  }

  return (
    <Stack
      direction={props.compress ? "column-reverse" : "row"}
      justifyContent="flex-end"
      spacing={1}
      sx={{
        width: '100%',
        maxWidth: `calc(${imageMaxSize}px + ${imageGap} + ${sideImageSize}px)`,
      }}
    >
      <Stack
        direction={props.compress ? "row" : "column"}
        justifyContent={props.compress ? "center" : "flex-start"}
        spacing={imageGap}
        sx={{
          height: props.compress ? 'auto' : '100%',
          maxHeight: props.compress ? 'auto' : imageMaxSize,
          width: props.compress ? '100%' : 'auto',
          overflowY: props.compress ? 'hidden' : 'auto',
          overflowX: props.compress ? 'auto' : 'hidden',
        }}
      >
        {
          getImages().map((_, i) => (
            <ProductImage
              key={i}
              imageIndex={i}
              selected={i === imageIndex}
              onClick={() => setImageIndex(i)}
              component="button"
              size={sideImageSize}
              srcs={images}
              product={product}
            />
          ))
        }
      </Stack>
      <Box
        width={`calc(100% - ${sideImageSize}px - ${imageGap})`}
        sx={{ marginInline: 'auto !important' }}
      >
        <ProductImage
          size="100%"
          maxSize={imageMaxSize}
          imageIndex={imageIndex}
          srcs={images}
          product={product}
          zoomable={!isAPreview}
        />
      </Box>
    </Stack>
  )
}





interface ProductFieldProps<T> {
  readonly name: string,
  readonly product?: Product,
  readonly mode?: 'preview' | 'default',
  readonly placeholder: T,
  readonly prefix?: string,
  readonly suffix?: string,
  readonly children: (value: any) => any
}

function ProductField<T>(props: ProductFieldProps<T>) {

  const prepareValue = (v?: T) => {
    if(!v)
      return ''

    if(typeof v === 'string' || v instanceof String || typeof v === 'number')
      return `${props.prefix ?? ''}${v}${props.suffix ?? ''}`

    return v
  }

  const getValue = (v: T) => {
    if(props.mode !== 'preview')
      return prepareValue(v)

    return v
      ? prepareValue(v)
      : props.placeholder
  }

  const getPreviewComponent = () =>
    <GetFormValue name={props.name}>
      {(v: T) => <> {props.children(getValue(v))}</>}
    </GetFormValue>

  return props.mode === 'preview'
    ? getPreviewComponent()
    : props.children(prepareValue((props.product as any)?.[props.name]))
}


interface ProductAttachmentButtonListProps {
  readonly mode?: 'default' | 'preview',
  readonly product?: Product,
  readonly attachments: FileWithId<File>[],
}

function ProductAttachmentButtonList(props: ProductAttachmentButtonListProps) {
  const shopApi = useShopApi()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAttachments = () => {
    const product = props.product

    if(props.mode === 'preview')
      return props.attachments
        .map(a => ({url: URL.createObjectURL(a.file), name: a.file.name}))

    return !product
      ? []
      : ProductUtils.getAttachments(shopApi, product)
  }

  const areNoAttachments = () => {
    return getAttachments()?.length === 0
  }

  if(areNoAttachments())
    return null

  return (
    <Box>
      <Button
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Vedi allegati
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
          getAttachments().map((a, i) => (
            <MenuItem
              key={i}
              component='a'
              target="_blank"
              download={a.name}
              href={a.url}
              onClick={handleClose}
              sx={{ maxWidth: 250 }}
            >
              <DownloadRounded/>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {a.name}
              </Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </Box>
  )
}


interface ProductDetailsAccordionProps {
  readonly detail: ProductDetail
}

function ProductDetailAccordion(props: ProductDetailsAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreRounded/>}
      >
        <Typography> {props.detail.title} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {parse(props.detail.description ?? '')}
      </AccordionDetails>
    </Accordion>
  )
}
