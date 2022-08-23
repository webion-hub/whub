import { Stack, Typography } from "@mui/material";
import { Product } from "@whub/wshop-api";
import { ReactNode } from "react";
import { Img } from "../Img";

interface ProductListItem {
  readonly listItemProps?: any,
  readonly product: Product,
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
        justifyContent: 'space-between !important'
      }}
      {...listItemProps}
    >
      <Stack
        spacing={2}
        direction="row"
      >
        <Img
          src={product.images?.[0].url}
          sx={{
            aspectRatio: 1,
            height: 48,
            borderRadius: 1,
          }}
        />
        <Stack
          direction="column"
        >
          <Typography>{product.name}</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {product.category?.name}
          </Typography>
        </Stack>
      </Stack>
      {props.children}
    </Stack>
  )
}
