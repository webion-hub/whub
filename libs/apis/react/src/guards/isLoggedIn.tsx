import { GuardAction, GuardFunction } from "../abstractions/Guard"
import { useAuth } from "../contexts/AuthContext"

export const useIsLoggedIn = (): GuardFunction => {
  const { checkIsLogged } = useAuth()

  return (go: GuardAction) => {
    checkIsLogged({
      onIsLooged: () => go('go'),
      onIsNotLooged: () => go('block'),
      onError: () => go('block'),
    })
  }
}
