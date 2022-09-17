import { CircularProgress, Stack, Typography } from "@mui/material"
import { Attachment } from "@whub/wshop-api"
import { FileProps, FileWithId, MaybeShow, MultipleFileController, SquareAddAttachment, SquareContainer, SquaresGrid, Utils, Validators } from "@whub/wui"
import { ReactNode, useEffect, useState } from "react"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { ProductUtils } from "../../lib/ProductUtils"
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
              files={i.value ?? []}
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

interface ProductAttachmentUploaderProps extends FileProps<Attachment> {
  readonly required?: boolean
}

function ProductAttachmentUploader(props: ProductAttachmentUploaderProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(props.files ?? [])

  useEffect(() => {
    setAttachments(props.files ?? [])
  }, [props.files])

  const onAdd = (file: File) => {
    const newAttachments = [...attachments]
      .map((a, k) => ({...a, id: k}))

    newAttachments.push({
        id: attachments.length,
        url: '',
        file: file,
        fileName: file.name
      })

    setAttachments(newAttachments)
    props.onChange?.(newAttachments)
  }

  const onRemove = (attachment: Attachment) => {
    const prepAttachments = attachments
      .filter(a => a.id !== attachment.id)
      .map((a, k) => ({ ...a, id: k }))

    setAttachments(prepAttachments)
    props.onChange?.(prepAttachments)
  }


  return (
    <SquaresGrid
      title={`Allegati${props.required ? '*' : ''}`}
      elements={attachments}
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
              <PromiseComponent
                promise={ProductUtils.getAttachmentFile(f)}
                loadingComponent={<CircularProgress/>}
              >
                {
                  res =>
                    <>
                      <Typography
                        variant="caption"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {res.name}
                      </Typography>
                      <Typography variant="caption">
                        {Utils.bytesToSize(res.size ?? 0)}
                      </Typography>
                    </>
                }
              </PromiseComponent>
            </Stack>
          </SquareContainer>
        )
      }
    </SquaresGrid>
  )
}


interface PromiseComponentProps<T> {
  readonly promise: Promise<T>,
  readonly deps?: any[]
  readonly loadingComponent?: ReactNode
  readonly children: (res: T) => any
}

function PromiseComponent<T>(props: PromiseComponentProps<T>) {
  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<T>()
  const deps = props.deps ?? []

  useEffect(() => {
    setLoading(true)
    props.promise
      .then(setRes)
      .finally(() => setLoading(false))
  }, deps)

  return loading || !res
    ? props.loadingComponent
    : props.children(res)
}
