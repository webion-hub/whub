import { Stack, Typography } from "@mui/material"
import { FileWithId, InputValidator, InputValidatorGroup, InputValidatorGroupProps, MaybeShow, SquareAddAttachment, SquareAddImage, SquareContainer, SquareImageContainer, SquaresGrid, Utils } from "@whub/wui"
import { useEffect, useState } from "react"

interface FileProps<T> {
  readonly onChange?: (file: T[]) => void,
  readonly files?: T[],
}


export function AddProductStepThree(props: InputValidatorGroupProps) {
  return (
    <InputValidatorGroup {...props}>
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
      <InputValidator
        name="attachments"
        mode="manual"
        value={[] as FileWithId<File>[]}
      >
        {
          i =>
            <Stack
              direction="column"
            >
              <ProductAttachmentUploader
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
                  Errore caricamento file.
                </Typography>
              </MaybeShow>
            </Stack>
        }
      </InputValidator>
    </InputValidatorGroup>
  )
}

class MultipleFileController {
  static initFiles = <T,>(files: T[]): FileWithId<T>[] => {
    return files
      .map((f, i) => ({
        id: i,
        file: f,
      }))
  }

  static addFile = <T,>(file: T, list: FileWithId<T>[]) => {
    list.push({
      file: file,
      id: list.length
    })

    return [...list]
  }

  static removeFile = <T,>(img: FileWithId<T>, list: FileWithId<T>[]) => {
    return list
      .filter(i => i.id !== img.id)
      .map((i, k) => ({ ...i, id: k }))
  }
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



function ProductAttachmentUploader(props: FileProps<FileWithId<File>>) {
  const [attachment, setAttachment] = useState<FileWithId<File>[]>(props.files ?? [])

  useEffect(() => {
    setAttachment(props.files ?? [])
  }, [props.files])

  const onAdd = (i: File) => {
    const prepAttachment = MultipleFileController.addFile(i, attachment)
    setAttachment(prepAttachment)
    props.onChange?.(prepAttachment)
  }

  const onRemove = (i: FileWithId<File>) => {
    const prepAttachment = MultipleFileController.removeFile(i, attachment)
    setAttachment(prepAttachment)
    props.onChange?.(prepAttachment)
  }

  return (
    <SquaresGrid
      title="Allegati"
      elements={attachment}
      firstElement={
        <SquareAddAttachment
          onAddPdf={onAdd}
        />
      }
    >
      {
        f => (
          <SquareContainer
            key={f.id}
            onDelete={() => onRemove(f)}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ height: '100%' }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {f.file.name}
              </Typography>
              <Typography variant="caption">
                {Utils.bytesToSize(f.file.size)}
              </Typography>
            </Stack>
          </SquareContainer>
        )
      }
    </SquaresGrid>
  )
}
