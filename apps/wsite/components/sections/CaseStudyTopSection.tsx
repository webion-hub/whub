import { Stack, Typography } from "@mui/material";
import Section from "@webion/ui-layout/Section";
import { ImageAndDescription, ImageAndDescriptionProps } from "../blocks/ImageAndDescription";

interface CaseStudyTopSectionProps extends ImageAndDescriptionProps {
  readonly mainTitle: string;
} 

export function CaseStudyTopSection(props: CaseStudyTopSectionProps) {
  const { mainTitle, ...other } = props

  return (
    <Section>
      <Stack
        direction="column"
        spacing={4}
        sx={{ margin: 4 }}
      >
        <Typography variant="h2" textAlign="center">
          {mainTitle}
        </Typography>
        <ImageAndDescription
          {...other}
          paperSx={{
            height: {
              xs: '200px !important',
              md: '100% !important'
            }
          }}
        />
      </Stack>
    </Section>
  )
}