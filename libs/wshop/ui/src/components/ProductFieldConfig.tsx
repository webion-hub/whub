import { ShopConfig, useShop } from "@whub/apis-react"

export type ProductInputs = keyof ShopConfig

interface ProductFieldConfigProps<T extends ProductInputs> {
  readonly name: T,
  readonly children:(config: ShopConfig[T]) => JSX.Element | null
}

export function ProductFieldConfig<T extends ProductInputs>(props: ProductFieldConfigProps<T>): JSX.Element | null {
  const config = useShop().config?.[props.name]
  const shouldShow = (config as any)?.show ?? true

  if(!shouldShow || !config)
    return null

  return props.children(config as ShopConfig[T])
}
