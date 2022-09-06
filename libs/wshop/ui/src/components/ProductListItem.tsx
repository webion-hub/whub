import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { Product } from "@whub/wshop-api";
import { ReactNode } from "react";
import { ProductImage } from "./ProductImage";

interface ProductListItem {
  readonly listItemProps?: any,
  readonly product: Product,
  readonly sx?: SxProps<Theme>,
  readonly children?: ReactNode,
  readonly onClick?: () => void,
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
      onClick={props.onClick}
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
        <Typography
          sx={{
            maxWidth: 150,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.name}
        </Typography>
      </Stack>
      {props.children}
    </Stack>
  )
}
