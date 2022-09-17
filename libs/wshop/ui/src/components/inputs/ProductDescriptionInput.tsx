import { useShop } from "@whub/apis-react";
import { TextEditor, Utils, Validators } from "@whub/wui";
import { ProductInput } from "../ProductInput";

export function ProductDescriptionInput() {
  const config = useShop().config?.description
  const validators = config?.validators?.general ?? []

  if(!config?.show)
    return null

  return (
    <ProductInput
      name="description"
      value=""
      getValidators={config => [
        Validators.customValidator((description: string) => {
          const desc = Utils.stripHtml(description ?? '')

          return true &&
            Validators.isRequired(config.required)(desc) &&
            Validators.validate(desc, validators)
        })
      ]}
    >
      {
        (config, i) =>
          <TextEditor
            {...i}
            required={config.required}
            label="Descrizione"
            maxCharacters={4096}
          />
      }
    </ProductInput>
  )
}
