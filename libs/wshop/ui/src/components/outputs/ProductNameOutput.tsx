import { Typography } from "@mui/material"
import parse from 'html-react-parser';
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput"

export function ProductNameOutput(props: GeneralProductOutputProps) {
  return (
    <Typography
      variant="h4"
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      <ProductOutput
        name="name"
        {...props}
      >
        { v => parse(v ?? '') }
      </ProductOutput>
    </Typography>
  )
}
