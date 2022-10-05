import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Product } from "@whub/wshop-api";
import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";

interface ProductRelatedOutputProps extends GeneralProductOutputProps {
  readonly compress?: boolean
}

export function ProductRelatedOutput(props: ProductRelatedOutputProps) {
  const { compress, ...other } = props

  return (
    <ProductOutput
      name="relatedProducts"
      {...other}
    >
      {
        (products) => {
          return <RelatedProducts
            products={products ? [...products] : []}
            number={compress ? 1 : 3}
          />
        }
      }
    </ProductOutput>
  )
}

interface RelatedProductsProps {
  readonly products: Product[],
  readonly number: number,
}

export function RelatedProducts(props: RelatedProductsProps) {
  const [index, setIndex] = useState(0)
  const noProducts = props.products.length === 0
  const isFirst = index === 0
  const isLast = props.products.length - props.number <= index

  const onIncrease = () => {
    const newIndex = index + props.number

    setIndex(
      newIndex > props.products.length - props.number
        ? props.products.length - props.number
        : newIndex
    )
  }

  const onDecrease = () => {
    const newIndex = index - props.number

    setIndex(
      newIndex < 0
        ? 0
        : newIndex
    )
  }

  if(noProducts)
    return null

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Typography variant="h6" > Prodotti correlati </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Box>
          <IconButton
            onClick={() => onDecrease()}
            disabled={isFirst}
            sx={{
              opacity: isFirst
                ? 0
                : 1
            }}
          >
            <ChevronLeftRounded/>
          </IconButton>
        </Box>
        {
          props.products
            .slice(index, index + props.number)
            .map((p, i) => (
              <ProductCard
                key={i}
                product={p}
              />
            ))
        }
        <Box>
          <IconButton
            onClick={() => onIncrease()}
            disabled={isLast}
            sx={{
              opacity: isLast
                ? 0
                : 1
            }}
          >
            <ChevronRightRounded/>
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  )
}
