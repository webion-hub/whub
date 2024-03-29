import { InputEvent } from "@wui/core"

export interface AttachmentUploaderProps {
  readonly onChange?: (e: InputEvent) => void
}

export function AttachmentUploader(props: AttachmentUploaderProps){
  return (
    <input
      type="file"
      onChange={props.onChange}
      hidden
    />
  )
}
