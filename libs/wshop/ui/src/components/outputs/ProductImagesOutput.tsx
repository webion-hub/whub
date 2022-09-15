import { Box, Stack, useTheme } from "@mui/material";
import { FileWithId } from "@whub/wui";
import _ from "lodash";
import { useState } from "react";
import { ProductImage } from "../ProductImage";
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";
import { useProduct } from "../ProductWrapper";


export function ProductImagesOutput(props: GeneralProductOutputProps) {
  const { compress } = useProduct()

  return (
    <ProductOutput
      name="images"
      {...props}
    >
      {
        images =>
          <ProductImagesViewer
            compress={compress}
            previewImages={images ?? []}
          />
      }
    </ProductOutput>
  )
}

interface ProductImagesViewerProps {
  readonly previewImages: FileWithId<string>[],
  readonly compress?: boolean
}

export function ProductImagesViewer(props: ProductImagesViewerProps) {
  const theme = useTheme()
  const [imageIndex, setImageIndex] = useState(0)

  const sideImageSize = 64
  const imageGap = theme.spacing(1)
  const imageMaxSize = 400

  const getImages = () => {
    const images = _(props.previewImages)
      .sortBy(i => i.id)
      .map(i => i.file)
      .value()

    return images ?? []
  }

  return (
    <Stack
      direction={props.compress ? "column-reverse" : "row"}
      justifyContent="flex-end"
      spacing={1}
      sx={{
        width: '100%',
        maxWidth: `calc(${imageMaxSize}px + ${imageGap} + ${sideImageSize}px)`,
      }}
    >
      <Stack
        direction={props.compress ? "row" : "column"}
        justifyContent={props.compress ? "center" : "flex-start"}
        spacing={imageGap}
        sx={{
          height: props.compress ? 'auto' : '100%',
          maxHeight: props.compress ? 'auto' : imageMaxSize,
          width: props.compress ? '100%' : 'auto',
          overflowY: props.compress ? 'hidden' : 'auto',
          overflowX: props.compress ? 'auto' : 'hidden',
        }}
      >
        {
          getImages().map((_, i) => (
            <ProductImage
              key={i}
              imageIndex={i}
              selected={i === imageIndex}
              onClick={() => setImageIndex(i)}
              component="button"
              size={sideImageSize}
              srcs={getImages()}
            />
          ))
        }
      </Stack>
      <Box
        width={`calc(100% - ${sideImageSize}px - ${imageGap})`}
        sx={{ marginInline: 'auto !important' }}
      >
        <ProductImage
          size="100%"
          maxSize={imageMaxSize}
          imageIndex={imageIndex}
          srcs={getImages()}
          zoomable
        />
      </Box>
    </Stack>
  )
}
