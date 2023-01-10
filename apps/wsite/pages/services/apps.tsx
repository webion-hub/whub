import {
  BubbleChartRounded,
  CallRounded,
  DevicesOtherRounded,
  EditRounded, MobileFriendlyRounded,
  SecurityRounded,
  StoreRounded
} from '@mui/icons-material';
import { Button, useTheme } from '@mui/material';
import {
  Page, PageSettings, Section,
  Sections,
  useLanguage,
  useNextNavigator
} from '@whub/wui';
import { FaqSection } from '../../components/sections/FaqSection';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { CaseStudyLink } from '../../components/CaseStudyLink';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function Apps() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="app" />
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('apps')}
            title={t('app-page-title')}
            description={tHtml('app-page-description')}
            src="/assets/images/services/apps.jpg"
            alt="apps"
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
        <Section>
          <CardGroup label={t('app-features')} title={t('app-features-title')}>
            <IconCard
              icon={<BubbleChartRounded fontSize="large" />}
              title={t('app-features-1-title')}
              paragraph={t('app-features-1-description')}
            />
            <IconCard
              icon={<EditRounded fontSize="large" />}
              title={t('app-features-2-title')}
              paragraph={t('app-features-2-description')}
            />
            <IconCard
              icon={<MobileFriendlyRounded fontSize="large" />}
              title={t('app-features-3-title')}
              paragraph={t('app-features-3-description')}
            />
            <IconCard
              icon={<StoreRounded fontSize="large" />}
              title={t('app-features-4-title')}
              paragraph={t('app-features-4-description')}
            />
            <IconCard
              icon={<SecurityRounded fontSize="large" />}
              title={t('app-features-5-title')}
              paragraph={t('app-features-5-description')}
            />
            <IconCard
              icon={<DevicesOtherRounded fontSize="large" />}
              title={t('app-features-6-title')}
              paragraph={t('app-features-6-description')}
            />
          </CardGroup>
        </Section>
        <Section>
          <CaseStudyLink
            title={t('example')}
            caseStudyTitle={t('bocconi-title')}
            caseStudyDescription={t('bocconi')}
            href="/studies/bocconi"
            src="/assets/images/projects/bocconi/bocconi.png"
          />
        </Section>
        <FaqSection/>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
