import { Stack, Typography } from "@mui/material"
import { FileWithId, SquareAddAttachment, SquareAddImage, SquareContainer, SquareImageContainer, SquaresGrid, Utils } from "@whub/wui"
import { useState } from "react"

export function AddProductStepThree() {
  const [images, setImages] = useState<FileWithId<string>[]>([])
  const [pdfs, setPdfs] = useState<FileWithId<File>[]>([])

  const addFile = <T,>(file: T, list: FileWithId<T>[]) => {
    list.push({
      file: file,
      id: list.length
    })

    return [...list]
  }

  const removeFile = <T,>(img: FileWithId<T>, list: FileWithId<T>[]) => {
    return list
      .filter(i => i.id !== img.id)
      .map((i, k) => ({ ...i, id: k }))
  }

  return (
    <>
      <SquaresGrid
        title="Immagini"
        elements={images}
        firstElement={
          <SquareAddImage
            onAddImage={(i) => setImages(addFile(i, images))}
          />
        }
      >
        {
          i => (
            <SquareImageContainer
              key={i.id}
              src={i.file}
              onDelete={() => setImages(removeFile(i, images))}
            />
          )
        }
      </SquaresGrid>
      <SquaresGrid
        title="Allegati"
        elements={pdfs}
        firstElement={
          <SquareAddAttachment
            onAddPdf={(f) => setPdfs(addFile(f, pdfs))}
          />
        }
      >
        {
          f => (
            <SquareContainer
              key={f.id}
              onDelete={() => setPdfs(removeFile(f, pdfs))}
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
    </>
  )
}
