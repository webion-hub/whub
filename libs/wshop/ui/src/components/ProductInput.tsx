import { ShopConfig } from "@whub/apis-react"
import { Form, InputBaseProps, InputValidator, Validator } from "@whub/wui"
import { ProductFieldConfig } from "./ProductFieldConfig"
import { PreviewProduct } from "./ProductHandler"

type ProductInputs = keyof ShopConfig

interface ProductInputProps<T extends ProductInputs & keyof PreviewProduct> {
  readonly value: PreviewProduct[T]
  readonly name: T,
  readonly getValidators?: (config: ShopConfig[T]) => Validator[],
  readonly children:(
    config: ShopConfig[T],
    input: InputBaseProps<PreviewProduct[T]>,
    form: Form,
  ) => JSX.Element | null
}

export function ProductInput<T extends ProductInputs & keyof PreviewProduct>(props: ProductInputProps<T>) {

  const getInputValidator = (config: ShopConfig[T]) => {
    return (
      <InputValidator
        mode="manual"
        name={props.name}
        value={props.value}
        validators={props.getValidators?.(config)}
      >
        { (i, form) => props.children(config, i, form) }
      </InputValidator>
    )
  }

  return (
    <ProductFieldConfig name={props.name}>
      { config => getInputValidator(config) }
    </ProductFieldConfig>
  )
}
