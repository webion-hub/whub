import { AppContext } from "../libs/AppContext"

export const isLoggedInGuard = async (redirect: string) => {
  const res = await AppContext
    .authApi
    .account
    .isLoggedIn()

  const isLoggedIn = res.data

  if(isLoggedIn)
    return {
      props: { success: true }
    }

  return {
    redirect: {
      destination: redirect,
      permanent: false
    }
  }
}
