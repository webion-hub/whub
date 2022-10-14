import { Box, Stack, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { useProduct } from "./ProductWrapper";

interface ProductFrameProps {
  readonly sx: SxProps<Theme>,
  readonly imagesComponent: ReactNode,
  readonly nameComponent: ReactNode,
  readonly descriptionComponent: ReactNode,
  readonly codeComponent: ReactNode,
  readonly categoryComponent: ReactNode,
  readonly priceComponent: ReactNode,
  readonly detailsComponent: ReactNode,
  readonly attachmentsComponent: ReactNode,
  readonly relatedComponent: ReactNode,
  readonly actionButton: ReactNode,
}

export function ProductFrame(props: Partial<ProductFrameProps>) {
  const { compress } = useProduct()

  return (
    <Stack
      direction="column"
      sx={{
        width: '100%',
        paddingTop: 4,
        ...props.sx
      }}
      spacing={4}
    >
      {props.categoryComponent}
      <Stack
        direction={compress ? 'column' : "row"}
        spacing={compress ? 0 : 12}
        alignItems={compress ? 'center' : 'flex-start'}
        sx={{
          "& > *": {
            width: compress ? '100%' : '50%'
          },
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          alignItems={compress ? 'center' : 'flex-end'}
        >
          {props.imagesComponent}
        </Stack>

        <Stack
          direction="column"
          spacing={2}
          sx={{ padding: 1 }}
        >
          <Stack
            direction="column"
            spacing={4}
          >
            <Stack
              direction="column"
              spacing={1}
            >
              {props.nameComponent}
              {props.descriptionComponent}
            </Stack>
            {props.priceComponent}
          </Stack>
          <Box>
            {props.actionButton}
          </Box>
          {props.detailsComponent}
          {props.attachmentsComponent}
          {props.codeComponent}
        </Stack>
      </Stack>
      {props.relatedComponent}
    </Stack>
  )
}
