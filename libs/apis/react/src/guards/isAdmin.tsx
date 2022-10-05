import { GuardAction, GuardFunction } from "../abstractions/Guard"
import { useAuth } from "../contexts/AuthContext"

export const useIsAdmin = (): GuardFunction => {
  const { checkUser } = useAuth()

  return async (go: GuardAction) => {
    const user = await checkUser({
      onError: () => go('block'),
    })

    return user.roles.some(r => r.toLowerCase() === 'admin')
      ? go('go')
      : go('block')
  }
}
