import { ContactUsApi } from '@whub/apis-contactus'
import { SimpleAuthApi } from '@whub/simple-auth'
import { WShopApi } from '@whub/wshop-api'
import { createContext, ReactNode } from "react"

export interface ApiProps {
  readonly apis: IApiContext,
  readonly children: ReactNode
}

export interface IApiContext {
  readonly contactUs?: ContactUsApi,
  readonly shop?: WShopApi,
  readonly auth?: SimpleAuthApi,
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
