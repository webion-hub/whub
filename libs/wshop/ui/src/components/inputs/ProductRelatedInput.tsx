import { Validators } from "@whub/wui"
import { ConfigUtils } from "../../lib/ConfigUtils"
import { CorrelatedProductsSelect } from "../CorrelatedProductsSelect"
import { ProductInput } from "../ProductInput"

export interface ProductRelatedInputProps {
  readonly productId?: number
}

export function ProductRelatedInput(props: ProductRelatedInputProps) {
  return (
    <ProductInput
      name="relatedProducts"
      value={[]}
      getValidators={config => [
        Validators.min(config.required ? 1 : 0),
        ...ConfigUtils.getValidators(config, 'general')
      ]}
    >
      {
        (config, i) =>
          <CorrelatedProductsSelect
            {...i}
            avoidId={props.productId}
            required={config.required}
          />
      }
    </ProductInput>
  )
}
