import { useIsAdmin } from "./isAdmin";
import { useIsLoggedIn } from "./isLoggedIn";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Guards {
  export const useIsLoggedInGuard = useIsLoggedIn
  export const useIsAdminGuard = useIsAdmin
}
