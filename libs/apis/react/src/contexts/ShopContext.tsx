import { Producer, ProductDetail, Tag, WShopApi } from '@whub/wshop-api'
import { Validator } from '@whub/wui'
import { createContext, useContext } from "react"
import { ApiContext, ApiContextProps } from '../abstractions/ApiContextProps'

export interface ShopFieldConfig<T> {
  readonly show: boolean,
  readonly validators: T
  readonly addTableColumn?: boolean,
  readonly required?: boolean,
}

type ComplexFields<T> = keyof T

export interface BaseField {
  readonly general: Validator[];
};

type ComplexFieldConfig<T> = {
  readonly [key in ComplexFields<T & BaseField>]?: Validator[]
}

type BaseShopFieldConfig = ShopFieldConfig<BaseField>
type ComplexShopFieldConfig<T> = ShopFieldConfig<ComplexFieldConfig<T>>

interface RequiredField {
  readonly addTableColumn?: boolean,
  readonly validators: BaseField
}

export interface ShopConfig {
  readonly name: RequiredField;
  readonly code: RequiredField;
  readonly description:     BaseShopFieldConfig;
  readonly price:           BaseShopFieldConfig;
  readonly category:        BaseShopFieldConfig;
  readonly rating:          BaseShopFieldConfig;
  readonly images:          BaseShopFieldConfig;
  readonly attachments:     BaseShopFieldConfig;
  readonly relatedProducts: BaseShopFieldConfig;
  readonly mainVariant:     BaseShopFieldConfig;
  readonly variants:        BaseShopFieldConfig;
  readonly details:  ComplexShopFieldConfig<ProductDetail>;
  readonly producer: ComplexShopFieldConfig<Producer>;
  readonly tags:     ComplexShopFieldConfig<Tag>;
}

export type IShopContext = ApiContext<WShopApi, Partial<ShopConfig>>
export type IShopContextProps = ApiContextProps<WShopApi, Partial<ShopConfig>>

export const ShopContext = createContext<IShopContext>({
  api: {} as WShopApi,
})

export const ShopWrapper = (props: IShopContextProps) => {
  const { children, ...other } = props

  return (
    <ShopContext.Provider
      value={other}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => useContext(ShopContext)
