import React from 'react';
import NumberFormat, { InputAttributes } from 'react-number-format';

export interface NumberInputProps {
  readonly onChange: (event: { target: { name: string; value: string } }) => void;
  readonly name: string;
  readonly decimalSeparator?: string;
  readonly prefix?: string;
  readonly allowNegative?: boolean;
}

export const NumberInput = React.forwardRef<
  NumberFormat<InputAttributes>,
  NumberInputProps
>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      allowNegative={props.allowNegative}
      decimalSeparator={props.decimalSeparator}
      prefix={props.prefix}
    />
  );
});
