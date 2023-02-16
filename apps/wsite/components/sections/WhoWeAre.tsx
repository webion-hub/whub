import CallRounded from '@mui/icons-material/CallRounded';

import Button from '@mui/material/Button';
import { useNextNavigator } from '@webion/ui-core';
import Section from '@webion/ui-layout/Section';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import { ISection } from '@webion/ui-sections/abstractions/ISection';

import { ImageAndDescription } from '../blocks/ImageAndDescription';

export default function WhoWeAre(props: ISection) {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
    <Section id={props.id}>
      <ImageAndDescription
        label={t('who-we-are')}
        title={t('who-we-are-title')}
        description={tHtml('who-we-are-desc')}
        direction="row"
        src="/assets/images/computer.webp"
        alt="about-us"
        paperSx={{
          backgroundColor: '#fff',
          boxShadow: 'none',
          border: 'none',
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
  );
}
