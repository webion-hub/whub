import { Stack, Typography } from "@mui/material"
import { Image } from "@whub/wshop-api"
import { FileProps, MaybeShow, SquareAddImage, SquareImageContainer, SquaresGrid, Validators } from "@whub/wui"
import _ from "lodash"
import { useState } from "react"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { ProductInput } from "../ProductInput"

export function ProductImagesInput() {
  return (
    <ProductInput
      name="images"
      value={[]}
      getValidators={config => [
        Validators.min(config.required ? 1 :0),
        ...ConfigUtils.getValidators(config, 'general')
      ]}
    >
      {
        (config, i) =>
          <Stack
            direction="column"
          >
            <ProductImagesUploader
              required={config.required}
              files={i.value}
              onChange={f => i.onChange?.({ target: { value: f } })}
            />
            <MaybeShow
              show={!!i.error}
            >
              <Typography
                variant="caption"
                color="error"
              >
                Errore.
              </Typography>
            </MaybeShow>
          </Stack>
      }
    </ProductInput>

  )
}

interface ProductImagesUploaderProps extends FileProps<Image> {
  readonly required?: boolean
}

function ProductImagesUploader(props: ProductImagesUploaderProps) {
  const [images, setImages] =
    useState<Image[]>(_(props.files).sortBy(f => f.index).value() ?? [])

  const onAdd = (i: string) => {
    const maxIndex = _(images).maxBy(i => i.index)?.index ?? 0
    const newImages = [...images]
      .map((i, k) => ({...i, id: k}))

    newImages.push({
        id: images.length,
        index: maxIndex + 1,
        url: i,
      })

    setImages(newImages)
    props.onChange?.(newImages)
  }

  const onRemove = (img: Image) => {
    const prepImg = images
      .filter(i => i.id !== img.id)
      .map((i, k) => ({ ...i, id: k }))

    setImages(prepImg)
    props.onChange?.(prepImg)
  }

  return (
    <SquaresGrid
      title={`Immagini${props.required ? '*' : ''}`}
      elements={images}
      firstElement={
        <SquareAddImage
          onAddImage={onAdd}
        />
      }
    >
      {
        i => (
          <SquareImageContainer
            key={i.id}
            src={i.url}
            onDelete={() => onRemove(i)}
          />
        )
      }
    </SquaresGrid>
  )
}
