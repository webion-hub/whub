import { AccountInfo } from "@wapi/simple-auth";

export class UserUtils {
  static hasRole(role: string, user?: AccountInfo) {
    return !!user
      ?.roles
      .some(r => r.toLowerCase() === role.toLocaleLowerCase())
  }
}
