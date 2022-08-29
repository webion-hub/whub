import { FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps, Theme } from "@mui/material"
import { useState } from "react"

export interface DropdownProps<T> extends SelectProps {
  readonly getOptionLabel: (option: T) => string,
  readonly getValue: (option: T) => string,
  readonly elements: T[],
  readonly focused: boolean,
  readonly selectSx?: SxProps<Theme>,
  readonly onValueChange: (value: T) => void
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const {
    elements,
    selectSx,
    sx,
    focused,
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
      focused={focused}
    >
      <InputLabel id="dropdown-label">{others.label}</InputLabel>
      <Select
        {...others}
        labelId="dropdown-label"
        id="dropdown"
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
