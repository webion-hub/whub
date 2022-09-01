import { GuardAction, GuardFunction } from "../abstractions/Guard"
import { useAuth } from "../contexts/AuthContext"

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Guards {
  export const useIsLoggedInGuard = (): GuardFunction => {
    const { checkIsLogged } = useAuth()

    return (go: GuardAction) => {
      checkIsLogged({
        onIsLooged: () => go('go'),
        onIsNotLooged: () => go('block'),
        onError: () => go('block'),
      })
    }
  }
}
