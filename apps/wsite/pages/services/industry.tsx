import {
  CallRounded,
  InsightsRounded,
  LibraryBooksRounded,
  LinkRounded,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { CaseStudyLink } from '../../components/CaseStudyLink';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';

export default function Industry() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName='industry' />
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('industry')}
            title={t('industry-page-title')}
            description={tHtml('industry-page-description')}
            src="/assets/images/services/industry.jpg"
            alt="industry"
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
          <CardGroup
            label={t('solutions')}
            title={t('industry-solutions-title')}
          >
            <IconCard
              icon={<LinkRounded fontSize="large" />}
              title={t('industry-features-1-title')}
              paragraph={t('industry-features-1-description')}
            />
            <IconCard
              icon={<LibraryBooksRounded fontSize="large" />}
              title={t('industry-features-2-title')}
              paragraph={t('industry-features-2-description')}
            />
            <IconCard
              icon={<InsightsRounded fontSize="large" />}
              title={t('industry-features-3-title')}
              paragraph={t('industry-features-3-description')}
            />
          </CardGroup>
        </Section>
        <Section>
          <CaseStudyLink
            title={t('collaboration-title')}
            caseStudyTitle={t('kaire-title')}
            caseStudyDescription={t('kaire-short-description')}
            href="/studies/kaire"
            src="/assets/images/kaire2.webp"
          />
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
