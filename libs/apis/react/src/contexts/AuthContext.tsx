import { handleResponse } from "@whub/apis-core"
import { AccountInfo, LoginRequest, SimpleAuthApi } from "@whub/simple-auth"
import { createContext, useContext, useEffect, useState } from "react"
import { ApiContext, ApiContextProps } from "../abstractions/ApiContextProps"
import { UserUtils } from "../libs/UserUtils"

export type IAuthContext = ApiContext<SimpleAuthApi, unknown>
export type IAuthContextProps = ApiContextProps<SimpleAuthApi, unknown>

export interface AuthActions {
  readonly onError?: () => void,
}

export interface AuthActionsIsLoogedIn {
  readonly onIsLooged?: () => void,
  readonly onIsNotLooged?: () => void,
  readonly onError?: () => void,
}

interface IAuthContextFull extends IAuthContext {
  readonly user?: AccountInfo,
  readonly isAdmin: boolean,
  readonly isLogged: boolean,
  readonly loading: boolean,
  readonly checkUser: (actions?: AuthActions) => Promise<AccountInfo>,
  readonly checkIsLogged: (actions?: AuthActionsIsLoogedIn) => Promise<void>,
  readonly logIn: (credentials: LoginRequest, actions?: AuthActions) => Promise<boolean>,
  readonly logOut: (actions?: AuthActions) => Promise<void>,
}

export const AuthContext = createContext<IAuthContextFull>({
  isAdmin: false,
  isLogged: false,
  loading: false,
  checkUser: () => new Promise<AccountInfo>(res => res({} as AccountInfo)),
  checkIsLogged: () => new Promise<void>(res => res()),
  logIn: () => new Promise<boolean>(res => res(false)),
  logOut: () => new Promise<void>(res => res()),
  api: {} as SimpleAuthApi,
})

export const AuthWrapper = (props: IAuthContextProps) => {
  const authApi = props.api

  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [user, setUser] = useState<AccountInfo>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    checkUser()
      .finally(() => setLoading(false))
  }, [])

  const checkUser = async (actions?: AuthActions) => {
    setLoading(true)
    await checkIsLogged(actions)
    const res = await fetchUser(actions)
    setLoading(false)
    return res
  }

  const fetchUser = async (actions?: AuthActions) => {
    setLoading(true)
    const res = await authApi.account.info()

    handleResponse(res, {
      200: () => onUserFetch(res.data),
      401: actions?.onError
    })
    setLoading(false)

    return res.data
  }

  const checkIsLogged = async (actions?: AuthActionsIsLoogedIn) => {
    setLoading(true)
    const res = await authApi.account.isLoggedIn()

    handleResponse(res, {
      200: async () => await onIsLoggedCheck(res.data, actions),
      401: actions?.onError
    })

    setLoading(false)
  }

  const onIsLoggedCheck = async (isLogged: boolean, actions?: AuthActionsIsLoogedIn) => {
    if(isLogged)
      actions?.onIsLooged?.()

    isLogged
      ? await onLogIn({ onError: actions?.onError })
      : actions?.onIsNotLooged?.()
  }

  const logIn = async (credentials: LoginRequest, actions?: AuthActions) => {
    setLoading(true)
    const res = await authApi.account.login(credentials)

    handleResponse(res, {
      200: async () => await onLogIn(actions),
      401: actions?.onError
    })

    setLoading(false)
    return res.status === 200
  }

  const logOut = async (actions?: AuthActions) => {
    setLoading(true)
    const res = await authApi.account.logout()
    handleResponse(res, {
      200: () => onLogOut(),
      401: actions?.onError
    })

    setLoading(false)
  }

  const onLogIn = async (actions?: AuthActions) => {
    setIsLogged(true)
    await fetchUser(actions)
  }

  const onLogOut = () => {
    console.log('aaa')
    setIsLogged(false)
    setUser(undefined)
  }

  const onUserFetch = (user: AccountInfo) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin: UserUtils.hasRole('admin', user),
        isLogged,
        user,
        checkUser,
        checkIsLogged,
        logIn,
        logOut,
        loading: loading,
        api: props.api,
        config: props.config
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
