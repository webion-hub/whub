import { Stack, Typography } from "@mui/material"
import { FileWithId, InputValidator, InputValidatorGroup, InputValidatorGroupProps, SquareAddAttachment, SquareAddImage, SquareContainer, SquareImageContainer, SquaresGrid, Utils } from "@whub/wui"
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
        value={[] as string[]}
      >
        {
          i =>
            <ProductImagesUploader
              files={i.value}
              onChange={f => i.onChange?.({ target: { value: f } })}
            />
        }
      </InputValidator>
      <InputValidator
        name="attachment"
        mode="manual"
        value={[] as File[]}
      >
        {
          i =>
            <ProductAttachmentUploader
              files={i.value}
              onChange={f => i.onChange?.({ target: { value: f } })}
            />
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


function ProductImagesUploader(props: FileProps<string>) {
  const [images, setImages] = useState<FileWithId<string>[]>(
    MultipleFileController.initFiles(props.files ?? [])
  )

  useEffect(() => {
    props.onChange?.(images.map(i => i.file))
  }, [images])

  return (
    <SquaresGrid
      title="Immagini"
      elements={images}
      firstElement={
        <SquareAddImage
          onAddImage={(i) => setImages(MultipleFileController.addFile(i, images))}
        />
      }
    >
      {
        i => (
          <SquareImageContainer
            key={i.id}
            src={i.file}
            onDelete={() => setImages(MultipleFileController.removeFile(i, images))}
          />
        )
      }
    </SquaresGrid>
  )
}



function ProductAttachmentUploader(props: FileProps<File>) {
  const [attachment, setAttachment] = useState<FileWithId<File>[]>(
    MultipleFileController.initFiles(props.files ?? [])
  )

  useEffect(() => {
    props.onChange?.(attachment.map(i => i.file))
  }, [attachment])

  return (
    <SquaresGrid
      title="Allegati"
      elements={attachment}
      firstElement={
        <SquareAddAttachment
          onAddPdf={(f) => setAttachment(MultipleFileController.addFile(f, attachment))}
        />
      }
    >
      {
        f => (
          <SquareContainer
            key={f.id}
            onDelete={() => setAttachment(MultipleFileController.removeFile(f, attachment))}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ height: '100%' }}
            >
              <Typography variant="caption">
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
