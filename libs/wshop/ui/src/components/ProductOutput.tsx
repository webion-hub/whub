import { styled } from "@mui/material"
import { ShopConfig } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { GetFormValue } from "@whub/wui"
import { ReactNode } from "react"
import { ProductFieldConfig, ProductInputs } from "./ProductFieldConfig"
import { useProduct } from "./ProductWrapper"

export const Placeholder = styled('span')({
  opacity: 0.2,
  fontStyle: 'italic'
})

export interface GeneralProductOutputProps {
  readonly placeholder?: ReactNode,
}

export interface ProductOutputProps<T extends ProductInputs & keyof Product> extends GeneralProductOutputProps {
  readonly name: T,
  readonly children: (value?: Product[T], config?: ShopConfig[T]) => any,
  readonly showPlaceholder?: (value: Product[T]) => boolean,
}

export function ProductOutput<T extends ProductInputs & keyof Product>(props: ProductOutputProps<T>) {
  const {
    product,
    preview
  } = useProduct()

  const getPreviewComponent = (config: ShopConfig[T]) =>
    <GetFormValue name={props.name}>
      {(v: Product[T]) => {
        if(props.showPlaceholder?.(v) ?? !v)
          return <Placeholder>{props.placeholder}</Placeholder>

        return props.children(v, config)
      }}
    </GetFormValue>

  const getDefaultComponent = (config: ShopConfig[T]) => {
    const value = product?.[props.name]
    return value
      ? props.children(value, config)
      : null
  }

  const getComp = (config: ShopConfig[T]) => {
    return preview
      ? getPreviewComponent(config)
      : getDefaultComponent(config)
  }

  return (
    <ProductFieldConfig name={props.name}>
      {
        config => getComp(config)
      }
    </ProductFieldConfig>
  )
}
