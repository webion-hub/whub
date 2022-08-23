import { ContactUsApi } from '@whub/apis/contactus'
import { WShopApi } from '@whub/wshop-api'
import { createContext, ReactNode } from "react"

export interface ApiProps {
  readonly apis: IApiContext,
  readonly children: ReactNode
}

interface IApiContext {
  readonly contactUs?: ContactUsApi,
  readonly shop?: WShopApi
}

export const ApiContext = createContext<IApiContext>({})

export const ApiWrapper = (props: ApiProps) => {
  return (
    <ApiContext.Provider
      value={props.apis}
    >
      {props.children}
    </ApiContext.Provider>
  )
}
