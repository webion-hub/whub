import React from "react";

export interface InputValidatorGroupProps {
  readonly children?: any,
  readonly onError?: (name: string) => void
  readonly onSuccess?: (name: string) => void
}

export function InputValidatorGroup(props: InputValidatorGroupProps) {
  return React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        onError: props.onError,
        onSuccess: props.onSuccess,
      });
    });
}
