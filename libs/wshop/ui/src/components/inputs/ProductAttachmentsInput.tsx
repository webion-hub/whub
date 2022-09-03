import { Stack, Typography } from "@mui/material"
import { FileProps, FileWithId, InputValidator, MaybeShow, MultipleFileController, SquareAddAttachment, SquareContainer, SquaresGrid, Utils } from "@whub/wui"
import { useEffect, useState } from "react"

export function ProductAttachmentsInput() {
  return (
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
