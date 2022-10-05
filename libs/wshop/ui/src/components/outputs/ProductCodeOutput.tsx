import { Typography } from "@mui/material"
import parse from 'html-react-parser';
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput"

export function ProductCodeOutput(props: GeneralProductOutputProps) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ textTransform: 'uppercase' }}
    >
      <ProductOutput
        name="code"
        {...props}
      >
        { v => `Codice: ${parse(v ?? '')}` }
      </ProductOutput>
    </Typography>
  )
}
