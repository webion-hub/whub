import { AppContext } from "../libs/AppContext"

export const isAdminGuard = async (redirect: string) => {
  const res = await AppContext
    .authApi
    .account
    .info()

  const isAdmin = res.data
    .roles
    ?.some(r => r.toLowerCase() === 'admin')

  if(isAdmin)
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
