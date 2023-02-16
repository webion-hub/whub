import { CallRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNextNavigator } from "@webion/ui-core";
import Section from "@webion/ui-layout/Section";
import { useLanguage } from "@webion/ui-wrappers";
import { ReactNode } from "react";
import { ImageAndDescription } from "../blocks/ImageAndDescription";

interface ImageAndDescriptionSectionProps {
  readonly label: string;
  readonly title: string;
  readonly src: string;
  readonly alt: string;
  readonly description: ReactNode;
}

export function ImageAndDescriptionSection(props: ImageAndDescriptionSectionProps) {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <Section>
      <ImageAndDescription 
        {...props}
        direction="row"
        paperSx={{
          height: {
            xs: '200px !important',
            md: '100% !important'
          }
        }}
        actionComponent={
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<CallRounded />}
            href="/contact-us"
            onClick={clickNavigate('/contact-us')}
          >
            {t('contact-us')}
          </Button>
        }
      />
    </Section>
  )
}