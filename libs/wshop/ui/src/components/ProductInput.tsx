import { ShopConfig } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { Form, InputBaseProps, InputValidator, Validator } from "@whub/wui"
import { ProductFieldConfig } from "./ProductFieldConfig"

type ProductInputs = keyof ShopConfig

interface ProductInputProps<T extends ProductInputs & keyof Product> {
  readonly value: Product[T]
  readonly name: T,
  readonly getValidators?: (config: ShopConfig[T]) => Validator[],
  readonly children:(
    config: ShopConfig[T],
    input: InputBaseProps<Product[T]>,
    form: Form,
  ) => JSX.Element | null
}

export function ProductInput<T extends ProductInputs & keyof Product>(props: ProductInputProps<T>) {

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
