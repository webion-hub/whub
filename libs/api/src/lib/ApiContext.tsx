import { useContext } from 'react'
import { createContext, ReactNode, useRef } from "react"
import { ApiBase } from "./api-base"
import { ApiConfig } from "./settings/api-config"

export interface IApi {
  readonly api: typeof ApiBase,
  readonly config: ApiConfig,
}

export interface ApiProps {
  readonly apis: IApiContext,
  readonly children: ReactNode
}

interface IApiContext {
  readonly [key: string]: ApiBase,
}

export const ApiContext = createContext<IApiContext>({})

export const Api = (props: ApiProps) => {
  return (
    <ApiContext.Provider
      value={props.apis}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  return useContext(ApiContext)
}
