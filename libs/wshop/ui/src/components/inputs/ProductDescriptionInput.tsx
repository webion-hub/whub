import { InputValidator, TextEditor, Validators } from "@whub/wui";

export function ProductDescriptionInput() {
  return (
    <InputValidator
      name="description"
      value=''
      validators={[Validators.max(4096)]}
    >
      <TextEditor
        label="Descrizione"
        maxCharacters={4096}
      />
    </InputValidator>
  )
}
