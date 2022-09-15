import { Stack, Typography } from "@mui/material"
import { FileProps, FileWithId, MaybeShow, MultipleFileController, SquareAddImage, SquareImageContainer, SquaresGrid, Validators } from "@whub/wui"
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

interface ProductImagesUploaderProps extends FileProps<FileWithId<string>> {
  readonly required?: boolean
}

function ProductImagesUploader(props: ProductImagesUploaderProps) {
  const [images, setImages] = useState<FileWithId<string>[]>(props.files ?? [])

  const onAdd = (i: string) => {
    const prepImg = MultipleFileController.addFile(i, images)
    setImages(prepImg)
    props.onChange?.(prepImg)
  }

  const onRemove = (i: FileWithId<string>) => {
    const prepImg = MultipleFileController.removeFile(i, images)
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
            src={i.file}
            onDelete={() => onRemove(i)}
          />
        )
      }
    </SquaresGrid>
  )
}
