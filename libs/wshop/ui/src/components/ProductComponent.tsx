import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import { Category, Product, ProductDetail } from "@whub/wshop-api";
import { ReactNode, useEffect, useState } from "react";
import { ProductImage } from "./ProductImage";
import { GetFormValue, MaybeShow, Slideshow } from "@whub/wui";
import parse from 'html-react-parser';
import { DownloadRounded, ExpandMoreRounded } from "@mui/icons-material";
import { useShopApi } from "@whub/apis-react";
import { urlToHttpOptions } from "url";

interface ProductComponentBaseProps {
  readonly compress?: boolean,
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
    >
      <Stack
        direction="row"
        spacing={6}
        sx={{
          "& > *": {
            width: '50%'
          },
          "& .placeholder": {
            opacity: 0.2,
            fontStyle: 'italic'
          }
        }}
      >
        <Stack
          direction="column"
          alignItems="flex-end"
        >
          <ProductField
            name="category"
            mode={props.mode}
            product={product}
            placeholder=''
          >
            {
              category =>
                <Typography>
                  { category?.name }
                </Typography>
            }
          </ProductField>
          <ProductField
            name="images"
            mode={props.mode}
            product={product}
            placeholder={[] as string[]}
          >
            {
              images =>
                <ProductImagesViewer
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
                    <Typography variant="h4">
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
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" > Prodotti correlati </Typography>
      </Stack>
    </Stack>
  )
}


interface ProductImagesViewerProps {
  readonly mode?: 'default' | 'preview',
  readonly previewImages?: string[],
  readonly product?: Product
}

function ProductImagesViewer(props: ProductImagesViewerProps) {
  const theme = useTheme()
  const [imageIndex, setImageIndex] = useState(0)

  const sideImageSize = 64
  const imageGap = theme.spacing(1)
  const imageMaxSize = 512

  const isAPreview = props.mode === 'preview'
  const product = isAPreview
    ? undefined
    : props.product

  const images = isAPreview
    ? props.previewImages
    : undefined

  const getImages = () => {
    const images = isAPreview
      ? props.previewImages
      : props.product?.images

    return images ?? []
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      spacing={1}
      sx={{
        width: '100%',
        maxWidth: `calc(${imageMaxSize}px + ${imageGap} + ${sideImageSize}px)`,
      }}
    >
      <Stack
        direction="column"
        spacing={imageGap}
        sx={{
          height: imageMaxSize,
          overflowY: 'auto',
          overflowX: 'hidden',
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
      <Box width={`calc(100% - ${sideImageSize}px - ${imageGap})`}>
        <ProductImage
          size="100%"
          maxSize={512}
          imageIndex={imageIndex}
          srcs={images}
          product={product}
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
  readonly attachments: File[],
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
        .map(a => ({url: URL.createObjectURL(a), name: a.name}))

    if(!product)
      return []

    const shopProduct = shopApi.products.withId(product.id);
    const urls = product.attachments
      .map(a => ({
        url: shopProduct.attachments.withId(a.id).fullUrl,
        name: a.fileName
      }))

    return urls
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
