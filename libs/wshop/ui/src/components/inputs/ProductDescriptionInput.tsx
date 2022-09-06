import { InputValidator, TextEditor, Utils, Validators } from "@whub/wui";

export function ProductDescriptionInput() {
  return (
    <InputValidator
      name="description"
      value=''
      validators={[
        Validators.customValidator((description: string) => {
          const desc = Utils.stripHtml(description ?? '')
          return Validators.max(4096)(desc)
        })
      ]}    >
      <TextEditor
        label="Descrizione"
        maxCharacters={4096}
      />
    </InputValidator>
  )
}
