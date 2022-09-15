import { Typography } from "@mui/material"
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput"

export function ProductPriceOutput(props: GeneralProductOutputProps) {
  return (
    <Typography
      color="secondary"
    >
      <ProductOutput
        name="price"
        {...props}
      >
        { v => <strong> €{v} </strong> }
      </ProductOutput>
    </Typography>
  )
}
