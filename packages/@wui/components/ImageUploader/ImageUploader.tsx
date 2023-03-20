import { InputEvent } from "@wui/core"

export interface ImageUploaderProps {
  readonly onChange?: (e: InputEvent) => void
}

export function ImageUploader(props: ImageUploaderProps){
  return (
    <input
      type="file"
      accept="image/*"
      onChange={props.onChange}
      hidden
    />
  )
}
