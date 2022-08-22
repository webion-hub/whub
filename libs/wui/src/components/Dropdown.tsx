import { FormControl, InputLabel, MenuItem, Select, SelectProps, SxProps, Theme } from "@mui/material"

export interface DropdownProps extends SelectProps {
  readonly elements: string[],
  readonly selectSx: SxProps<Theme>
}

export function Dropdown(props: DropdownProps) {
  const { elements, selectSx, sx, ...others } = props

  return (
    <FormControl
      size={others.size}
      sx={sx}
    >
      <InputLabel>{others.label}</InputLabel>
      <Select
        {...others}
        sx={selectSx}
        value={''}
      >
        {elements?.map((el: string, i: number) => (
          <MenuItem
            value={i}
            key={i}
          >
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
