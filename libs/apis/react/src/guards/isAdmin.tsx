import { GuardAction, GuardFunction } from "../abstractions/Guard"
import { useAuth } from "../contexts/AuthContext"

export const useIsAdmin = (): GuardFunction => {
  const { checkUser } = useAuth()

  return (go: GuardAction) => {
    checkUser({
      onSuccess: (user) => {
        user.roles.some(r => r.toLowerCase() === 'admin')
          ? go('go')
          : go('block')
      },
      onError: () => go('block'),
    })
  }
}
