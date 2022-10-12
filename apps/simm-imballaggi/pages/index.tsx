import { NextImg, Page, Section, Sections } from '@whub/wui';
import { ChosenBy, Faq } from '@whub/page-sections';
import Home from '../components/sections/Home';
import MapSection from '../components/sections/MapSection';

export function Index() {

  return (
    <Page>
      <Sections>
        <Section
          id="home"
          maxWidth='100vw'
          sx={{ padding: 0 }}
        >
          <Home/>
        </Section>
        <Section
          id="chosen-by"
          ignoreSection
          maxWidth="100%"
          showBackground
          sx={{ paddingBlock: 4 }}
        >
          <ChosenBy
            hideDivider
          >
            <NextImg
              auto
              height="40px"
              sizes='25vw'
              alt="simm"
              src="/assets/images/logo.webp"
            />
          </ChosenBy>
        </Section>
        <Section
          id="chi-siamo"
          showBackground
          sx={{ paddingTop: 0 }}
        >
          <MapSection/>
        </Section>
        <Section>
          <Faq
            title='Faq'
            questions={[
              {
                question: 'CIAO',
                answer: '234',
              },
              {
                question: 'CIAO DDD',
                answer: '234',
              }
            ]}
          />
        </Section>
      </Sections>
    </Page>
  );
}

export default Index;
