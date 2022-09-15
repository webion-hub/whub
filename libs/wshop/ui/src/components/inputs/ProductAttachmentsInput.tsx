import { Stack, Typography } from "@mui/material"
import { FileProps, FileWithId, MaybeShow, MultipleFileController, SquareAddAttachment, SquareContainer, SquaresGrid, Utils, Validators } from "@whub/wui"
import { useEffect, useState } from "react"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { ProductInput } from "../ProductInput"

export function ProductAttachmentsInput() {
  return (
    <ProductInput
      name="attachments"
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
            <ProductAttachmentUploader
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

interface ProductAttachmentUploaderProps extends FileProps<FileWithId<File>> {
  readonly required?: boolean
}

function ProductAttachmentUploader(props: ProductAttachmentUploaderProps) {
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
      title={`Allegati${props.required ? '*' : ''}`}
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
