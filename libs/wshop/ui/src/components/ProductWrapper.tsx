import { createContext, ReactNode, useContext } from "react";
import { PreviewProduct } from "./ProductHandler";

interface ProductWrapperContext {
  readonly product?: PreviewProduct,
  readonly compress?: boolean,
  readonly preview?: boolean,
}

interface ProductWrapperProps extends ProductWrapperContext{
  readonly children: ReactNode
}

export const ProductWrapperContext = createContext<ProductWrapperContext>({})

export const ProductWrapper = (props: ProductWrapperProps) => {
  const { children, ...other } = props

  return (
    <ProductWrapperContext.Provider
      value={other}
    >
      {children}
    </ProductWrapperContext.Provider>
  )
}

export const useProduct = () => useContext(ProductWrapperContext)
