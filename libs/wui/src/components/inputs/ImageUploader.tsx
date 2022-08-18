import { InputEvent } from "../../abstractions/events/InputEvent"

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
