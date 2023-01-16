import { isAdminGuard } from "./isAdmin";
import { isLoggedInGuard } from "./isLoggedIn";

export namespace ServerGuards {
  export const isAdmin = isAdminGuard
  export const isLoggedIn = isLoggedInGuard
}
