export class Props {
  static setObjectDefaultProps<T>(defaultProps: T, props?: T) {
    return {
      ...defaultProps,
      ...props,
    }
  }
}