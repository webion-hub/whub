import { AccountInfo, LoginRequest } from "@whub/simple-auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { AppContext } from "../libs/AppContext"
import { UserUtils } from "../libs/UserUtils"

interface IAuthContextFull {
  readonly user?: AccountInfo,
  readonly isAdmin: boolean,
  readonly isLogged: boolean,
  readonly loading: boolean,
  readonly logIn: (credentials: LoginRequest) => Promise<boolean>,
  readonly logOut: () => Promise<void>,
  readonly getUser: () => Promise<AccountInfo | undefined>,
  readonly isLoggedIn: () => Promise<boolean>,
}

export const AuthContext = createContext<IAuthContextFull>({
  isAdmin: false,
  isLogged: false,
  loading: false,
  getUser: () => Promise.resolve({} as AccountInfo),
  isLoggedIn: () => Promise.resolve(false),
  logIn: () => Promise.resolve(false),
  logOut: () => Promise.resolve(),
})

export const AuthWrapper = (props: { children: ReactNode }) => {
  const authApi = AppContext.auth.api

  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [user, setUser] = useState<AccountInfo>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const action = async () => {
      const isLogged = await isLoggedIn()

      if(isLogged)
        await getUser()
    }

    action()
  }, [])



  const isLoggedIn = async () => {
    setLoading(true)
    const res = await authApi.account.isLoggedIn()
    setLoading(false)
    const isLoggedIn = res.data

    setIsLogged(isLoggedIn)
    return isLoggedIn
  }

  const getUser = async () => {
    setLoading(true)
    const res = await authApi.account.info()
    setLoading(false)

    if(res.status === 200) {
      setUser(res.data)
      return res.data
    }

    return
  }

  const logIn = async (credentials: LoginRequest) => {
    setLoading(true)
    const res = await authApi.account.login(credentials)
    setLoading(false)

    if(res.status === 200) {
      setIsLogged(true)
      await getUser()
      return true
    }

    return false
  }

  const logOut = async () => {
    setLoading(true)
    const res = await authApi.account.logout()
    setLoading(false)

    if(res.status === 200) {
      setIsLogged(false)
      setUser(undefined)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAdmin: UserUtils.hasRole('admin', user),
        isLogged,
        user,
        getUser,
        isLoggedIn,
        logIn,
        logOut,
        loading: loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
