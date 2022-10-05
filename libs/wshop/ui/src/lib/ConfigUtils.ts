import { Validator } from "@whub/wui";

interface BaseConfig<T> {
  readonly validators: T,
}

export class ConfigUtils {
  static getValidators<T>(config: BaseConfig<T>, key: keyof T ): Validator[] {
    return (config.validators[key] ?? []) as Validator[]
  }
}
