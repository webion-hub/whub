import { CallRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useLanguage, useNextNavigator } from '@whub/wui';
import { ImageAndDescription } from '../ImageAndDescription';

export function WhoWeAre() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
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
  );
}
