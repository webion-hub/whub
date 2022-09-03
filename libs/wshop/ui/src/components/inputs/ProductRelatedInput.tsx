import { Product } from "@whub/wshop-api"
import { InputValidator } from "@whub/wui"
import { CorrelatedProductsSelect } from "../CorrelatedProductsSelect"

export interface ProductRelatedInputProps {
  readonly productId?: number
}

export function ProductRelatedInput(props: ProductRelatedInputProps) {
  return (
    <InputValidator
      name="relatedProducts"
      value={[] as Product[]}
    >
      <CorrelatedProductsSelect avoidId={props.productId}/>
    </InputValidator>
  )
}
