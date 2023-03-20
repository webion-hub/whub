import { Box, Slider, Typography, useMediaQuery } from "@mui/material";
import { Stack, useTheme } from "@mui/system";

export interface Mark {
  readonly value: number,
  readonly label: string,
}

export interface CustomSliderProps {
  readonly label: string,
  readonly range: number[],
  readonly step: number,
  readonly value: number,
  readonly onChange?: (mark: Mark) => void, 
  readonly customMarks?: Mark[]
}

export function CustomSlider({ label, range, step, customMarks, value, onChange } : CustomSliderProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = Math.round(1 + range[0] / step) + (range[1] - range[0]) / step;
  const marks = [...Array(steps)]
    .map((_, i) => i * step + range[0])
    .map((v) => ({
      value: v,
      label: customMarks?.find(m => m.value === v)?.label ?? '',
    }))

  const handleChange = (e: any) => {
    const value = e.target.value
    const mark = marks.find(m => m.value === value)

    if(!mark)
      return

    onChange?.(mark)
  }

  return (
    <Stack
      direction="column"
      spacing={2}
    >
      <Typography variant='h6'>
        {label} 
      </Typography>
      <Box sx={{ height: { xs: 200, md: 'auto' } }}>
        <Slider
          defaultValue={range[0]}
          value={value}
          onChange={handleChange}
          step={step}
          marks={marks}
          min={range[0]}
          max={range[1]}
          orientation={isSm ? "vertical" : "horizontal"}
        />
      </Box>
    </Stack>
  )
}