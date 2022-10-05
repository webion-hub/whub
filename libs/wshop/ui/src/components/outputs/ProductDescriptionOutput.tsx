import { Typography } from "@mui/material"
import parse from 'html-react-parser';
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput"

export function ProductDescriptionOutput(props: GeneralProductOutputProps) {
  return (
    <Typography
      component='span'
    >
      <ProductOutput
        name="description"
        {...props}
      >
        { v => parse(v ?? '') }
      </ProductOutput>
    </Typography>
  )
}
