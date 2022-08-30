import { FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps, Theme } from "@mui/material"
import { useState } from "react"

export interface DropdownProps<T> extends SelectProps {
  readonly getOptionLabel: (option: T) => string,
  readonly getValue: (option: T) => string,
  readonly elements: T[],
  readonly selectSx: SxProps<Theme>,
  readonly onValueChange: (value: T) => void
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const {
    elements,
    selectSx,
    sx,
    onValueChange,
    getOptionLabel,
    getValue,
    ...others
  } = props
  const [value, setValue] = useState<T>()

  const handleValueChange = (value: T) => {
    setValue(value)
    onValueChange?.(value)
  }

  return (
    <FormControl
      size={others.size}
      sx={sx}
    >
      <InputLabel>{others.label}</InputLabel>
      <Select
        {...others}
        sx={selectSx}
        value={value ? props.getValue(value) : ''}
        onChange={e => handleValueChange(e.target.value as T)}
      >
        {elements?.map((el: T, i: number) => (
          <MenuItem
            value={props.getValue(el)}
            key={i}
          >
            {props.getOptionLabel(el)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
