import { Stack, Typography } from "@mui/material"
import { FileProps, FileWithId, InputValidator, MaybeShow, MultipleFileController, SquareAddImage, SquareImageContainer, SquaresGrid } from "@whub/wui"
import { useState } from "react"

export function ProductImagesInput() {
  return (
    <InputValidator
      name="images"
      mode="manual"
      value={[] as FileWithId<string>[]}
    >
      {
        i =>
          <Stack
            direction="column"
          >
            <ProductImagesUploader
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
                  Errore caricamento immagini.
                </Typography>
              </MaybeShow>
            </Stack>

      }
    </InputValidator>
  )
}

function ProductImagesUploader(props: FileProps<FileWithId<string>>) {
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
      title="Immagini"
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
