import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import { Product, ProductDetail } from "@whub/wshop-api";
import { ReactNode, useEffect, useState } from "react";
import { ProductImage } from "./ProductImage";
import { GetFormValue, MaybeShow } from "@whub/wui";
import parse from 'html-react-parser';

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
        {/*        <Stack
          direction="column"
        >
          {
            props.product.details.map((d, i) => (
              <ProductDetailAccordion
                key={i}
                detail={d}
              />
            ))
          }
        </Stack>*/}
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
    >
      <Stack
        direction="column"
        spacing={imageGap}
        sx={{
          height: 512,
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

  const prepareValue = (v: T) => {
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          props.product?.attachments.map((a, i) => (
            <MenuItem onClick={handleClose}>{a.fileName}</MenuItem>
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
      <AccordionSummary>
        <Typography> {props.detail.title} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {parse(props.detail.description ?? '')}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
