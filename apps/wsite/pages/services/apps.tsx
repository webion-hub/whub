import BubbleChartRounded from '@mui/icons-material/BubbleChartRounded';
import DevicesOtherRounded from '@mui/icons-material/DevicesOtherRounded';
import EditRounded from '@mui/icons-material/EditRounded';
import MobileFriendlyRounded from '@mui/icons-material/MobileFriendlyRounded';
import SecurityRounded from '@mui/icons-material/SecurityRounded';
import StoreRounded from '@mui/icons-material/StoreRounded';

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

export default function Apps() {
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="app" />
      <Sections>
        <ImageAndDescriptionSection
          label={t('apps')}
          title={t('app-page-title')}
          description={tHtml('app-page-description')}
          src="/assets/images/services/apps.jpg"
          alt="apps"
        />
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
        <CaseStudyLink
          title={t('example')}
          caseStudyTitle={t('bocconi-title')}
          caseStudyDescription={t('bocconi')}
          href="/studies/bocconi"
          src="/assets/images/projects/bocconi/bocconi.png"
        />
        <FaqSection
          questions={[
            {
              question: t('app-faq-q1'),
              answer: tHtml('app-faq-a1'),
            },
            {
              question: t('app-faq-q2'),
              answer: tHtml('app-faq-a2'),
            },
            {
              question: t('app-faq-q3'),
              answer: tHtml('app-faq-a3'),
            },
            {
              question: t('app-faq-q4'),
              answer: tHtml('app-faq-a4'),
            },
            {
              question: t('app-faq-q5'),
              answer: tHtml('app-faq-a5'),
            },
            {
              question: t('app-faq-q6'),
              answer: tHtml('app-faq-a6'),
            },
          ]}
        />
        <GetAQuote />
      </Sections>
    </Page>
  );
}
