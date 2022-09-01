import { handleResponse } from "@whub/apis-core"
import { useAuthApi } from "@whub/apis-react"
import { AccountInfo, LoginRequest } from "@whub/simple-auth"
import { ChildrenProps } from "@whub/wui"
import { createContext, useContext, useState } from "react"

export interface AuthActions {
  readonly onSuccess?: () => void,
  readonly onError?: () => void,
  readonly onComplete?: () => void,
}

export interface AuthActionsIsLoogedIn {
  readonly onIsLooged?: () => void,
  readonly onIsNotLooged?: () => void,
  readonly onError?: () => void,
  readonly onComplete?: () => void,
}

export interface AuthActionsUser {
  readonly onSuccess?: (user: AccountInfo) => void,
  readonly onError?: () => void,
  readonly onComplete?: () => void,
}

interface IAuthContext {
  readonly user?: AccountInfo,
  readonly isAdmin: boolean,
  readonly isLogged: boolean,
  readonly checkUser: (actions: AuthActionsUser) => void,
  readonly checkIsLogged: (actions: AuthActionsIsLoogedIn) => void,
  readonly logIn: (credentials: LoginRequest, actions: AuthActions) => void,
  readonly logOut: (actions: AuthActions) => void,
}

export const AuthContext = createContext<IAuthContext>({
  isAdmin: false,
  isLogged: false,
  checkUser: () => { return },
  checkIsLogged: () => { return },
  logIn: () => { return },
  logOut: () => { return }
})

export const AuthWrapper = (props: ChildrenProps) => {
  const authApi = useAuthApi()

  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [user, setUser] = useState<AccountInfo>()

  const checkUser = (actions: AuthActionsUser) => {
    checkIsLogged({
      onIsLooged: () => fetchUser(actions),
      onIsNotLooged: actions.onError,
    })

  }

  const fetchUser = (actions: AuthActionsUser) => {
    authApi.account
      .info()
      .then(res => handleResponse(res, { 200: () => onUserFetch(res.data, actions) }))
      .catch(err => handleResponse(err.response, { 401: () => actions.onError?.() }))
      .finally(() => actions.onComplete?.())
  }

  const checkIsLogged = (actions: AuthActionsIsLoogedIn) => {
    authApi.account
      .isLoggedIn()
      .then(res => handleResponse(res, { 200: () => onIsLoggedCheck(res.data, actions) }))
      .catch(err => handleResponse(err.response, { 401: () => actions.onError?.()}))
      .finally(() => actions.onComplete?.())
  }

  const onIsLoggedCheck = (isLogged: boolean, actions: AuthActionsIsLoogedIn) => {
    isLogged
      ? onLogIn({ ...actions, onSuccess: actions.onIsLooged })
      : actions.onIsNotLooged?.()
  }

  const logIn = (credentials: LoginRequest, actions: AuthActions) => {
    authApi.account
      .login(credentials)
      .then(res => handleResponse(res, { 200: () => onLogIn(actions) }))
      .catch(err => handleResponse(err.response, { 401: () => {
        actions.onError?.()
        actions.onComplete?.()
      }}))
  }

  const logOut = (actions: AuthActions) => {
    authApi.account
      .logout()
      .then(res => handleResponse(res, { 200: () => onLogOut(actions) }))
      .catch(err => handleResponse(err.response, { 401: actions.onError }))
      .finally(() => actions.onComplete?.())
  }

  const onLogIn = (actions: AuthActions) => {
    setIsLogged(true)
    fetchUser(actions)
  }

  const onLogOut = (actions: AuthActions) => {
    setIsLogged(false)
    setUser(undefined)
    actions.onSuccess?.()
  }

  const onUserFetch = (user: AccountInfo, actions: AuthActionsUser) => {
    setUser(user)
    actions.onSuccess?.(user)
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin: !!user?.roles.some(r => r.toLowerCase() === 'admin'),
        isLogged,
        user,
        checkUser,
        checkIsLogged,
        logIn,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
