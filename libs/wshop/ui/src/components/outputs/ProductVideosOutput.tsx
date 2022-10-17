import { Box, Stack } from "@mui/material";
import { MaybeShow, Slideshow } from "@whub/wui";
import parse from 'html-react-parser';
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";

export function ProductVideosOutput(props: GeneralProductOutputProps) {
  return (
    <ProductOutput
      name="videos"
      {...props}
    >
      {
        (videos) => {
          return (
            <MaybeShow
              show={(videos?.length ?? 0) > 1}
              alternativeChildren={
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{
                    "& > *": {
                      maxWidth: 500,
                      width: '100% !important',
                      aspectRatio: '16/9',
                      height: 'auto !important'
                    }
                  }}
                >
                  {parse(videos?.[0] ?? '')}
                </Stack>
              }
            >
              <Slideshow
                color='red'
                containerWidth={{ width: '100%', maxWidth: 500 }}
                itemWidth={{ width: '100%' }}
                items={
                  videos?.map(v => ({
                    item: () => (
                      <Box
                        sx={{
                          "& > *": {
                            maxWidth: 500,
                            width: '100% !important',
                            aspectRatio: '16/9',
                            height: 'auto !important'
                          }
                        }}
                      >
                        {parse(v)}
                      </Box>
                    )
                  }))
                  ?? []
                }
              />
            </MaybeShow>
          )
        }
      }
    </ProductOutput>
  )
}
