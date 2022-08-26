import { Product } from "@whub/wshop-api"
import { InputValidator, InputValidatorGroup, InputValidatorGroupProps, TextEditor, Validators } from "@whub/wui"
import { CorrelatedProductsSelect } from "../../CorrelatedProductsSelect"

export function AddProductStepTwo(props: InputValidatorGroupProps) {
  return (
    <InputValidatorGroup
      onSuccess={props.onSuccess}
      onError={props.onError}
    >
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
      <InputValidator
        name="correlated"
        value={[] as Product[]}
      >
        <CorrelatedProductsSelect/>
      </InputValidator>
    </InputValidatorGroup>
  )
}





