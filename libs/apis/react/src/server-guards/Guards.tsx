import { isAdminGuard } from "./isAdmin";
import { isLoggedInGuard } from "./isLoggedIn";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Guards {
  export const isAdmin = isAdminGuard
  export const isLoggedIn = isLoggedInGuard
}
