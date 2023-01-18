import {
  CallRounded, InsightsRounded,
  LibraryBooksRounded,
  LinkRounded
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import { useLanguage } from '@wui/wrappers';
import { ImageAndDescription } from '../../components/blocks/ImageAndDescription';
import { CardGroup } from '../../components/cards/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { CaseStudyLink } from '../../components/sections/CaseStudyLink';
import { FaqSection } from '../../components/sections/FaqSection';
import { GetAQuote } from '../../components/sections/GetAQuote';


export default function Industry() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="industry" />
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
        <CaseStudyLink
          title={t('collaboration-title')}
          caseStudyTitle={t('kaire-title')}
          caseStudyDescription={t('kaire-short-description')}
          href="/studies/kaire"
          src="/assets/images/kaire2.webp"
        />
        <FaqSection
          questions={[
            {
              question: t('industry-faq-q1'),
              answer: tHtml('industry-faq-a1'),
            },
            {
              question: t('industry-faq-q2'),
              answer: tHtml('industry-faq-a2'),
            },
            {
              question: t('industry-faq-q3'),
              answer: tHtml('industry-faq-a3'),
            },
            {
              question: t('industry-faq-q4'),
              answer: tHtml('industry-faq-a4'),
            },
            {
              question: t('industry-faq-q5'),
              answer: tHtml('industry-faq-a5'),
            },
          ]}
        />
        <GetAQuote />
      </Sections>
    </Page>
  );
}
