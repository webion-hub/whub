import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';
import HomeWithServices from '../components/sections/HomeWithServices';
import OurProcess from '../components/sections/OurProcess';
import Services from '../components/sections/Services';
import WhoWeAre from '../components/sections/WhoWeAre';

const WebionChosenBy1 = dynamic(() => import("../components/sections/WebionChosenBy1"), { ssr: true })
const WebionChosenBy2 = dynamic(() => import("../components/sections/WebionChosenBy2"), { ssr: true })

const GetAQuote = dynamic(() => import("../components/sections/GetAQuote"), { ssr: true })
const FaqSection = dynamic(() => import("../components/sections/FaqSection"), { ssr: true })

export default function Homepage() {
  const { t, tHtml } = useLanguage();

  return (
    <Page sx={{ marginTop: 0, margin: 'Auto' }}>
      <PageSettings pageTranslationName="home" />
      <Sections>
        <HomeWithServices id="home"/>
        <WebionChosenBy1 id="chosen-by"/>
        <WebionChosenBy2 id="chosen-by"/>
        <WhoWeAre id="who-we-are"/>
        <Services id="services"/>
        <OurProcess id="how-we-work"/>
        <GetAQuote id="quote"/>
        <FaqSection 
          id="faq"
          questions={[
            {
              question: t('website-faq-q1'),
              answer: tHtml('website-faq-a1'),
            },
            {
              question: t('website-faq-q2'),
              answer: tHtml('website-faq-a2'),
            },
            {
              question: t('website-faq-q3'),
              answer: tHtml('website-faq-a3'),
            },
            {
              question: t('website-faq-q4'),
              answer: tHtml('website-faq-a4'),
            },
            {
              question: t('website-faq-q5'),
              answer: tHtml('website-faq-a5'),
            },
            {
              question: t('website-faq-q6'),
              answer: tHtml('website-faq-a6'),
            },
          ]}
        />
      </Sections>
    </Page>
  );
}
