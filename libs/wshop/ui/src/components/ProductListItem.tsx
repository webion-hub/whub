import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { Product } from "@whub/wshop-api";
import { ReactNode } from "react";
import { ProductImage } from "./ProductImage";

interface ProductListItem {
  readonly listItemProps?: any,
  readonly product: Product,
  readonly sx?: SxProps<Theme>,
  readonly children?: ReactNode,
}

export function ProductListItem(props: ProductListItem) {
  const { listItemProps, product } = props


  return (
    <Stack
      spacing={2}
      component="li"
      direction="row"
      alignItems="center"
      sx={{
        width: '100%',
        justifyContent: 'space-between !important',
        ...props.sx
      }}
      {...listItemProps}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <ProductImage
          product={product}
          size={48}
        />
        <Typography>{product.name}</Typography>
      </Stack>
      {props.children}
    </Stack>
  )
}
