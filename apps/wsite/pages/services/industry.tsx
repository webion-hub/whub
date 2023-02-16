import InsightsRounded from '@mui/icons-material/InsightsRounded';
import LibraryBooksRounded from '@mui/icons-material/LibraryBooksRounded';
import LinkRounded from '@mui/icons-material/LinkRounded';

import Page from '@webion/ui-layout/Page';
import PageSettings from '@webion/ui-layout/PageSettings';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { CardGroup } from '../../components/cards/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { CaseStudyLink } from '../../components/sections/CaseStudyLink';
import { ImageAndDescriptionSection } from '../../components/sections/ImageAndDescriptionSection';

const FaqSection = dynamic(() => import("../../components/sections/FaqSection"), { ssr: true })
const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export default function Industry() {
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="industry" />
      <Sections>
        <ImageAndDescriptionSection
          label={t('industry')}
          title={t('industry-page-title')}
          description={tHtml('industry-page-description')}
          src="/assets/images/services/industry.jpg"
          alt="industry"
        />
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
