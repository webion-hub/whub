import { NextImg, Page, Section, Sections } from '@whub/wui';
import { ChosenBy, Faq } from '@whub/page-sections';
import Home from '../components/sections/Home';
import MapSection from '../components/sections/MapSection';
import { AppContext } from '@whub/apis-react';

export async function getStaticProps({ params }) {
  const endpoint = AppContext.shopApi.categories
  const res = await endpoint.list()

  return {
    revalidate: 60,
    props: {
      fallback: {
        [endpoint.url]: res.data
      }
    }
  }
}

export function Index() {
  return (
    <Page sx={{ overflowX: 'hidden' }}>
      <Sections>
        <Section
          id="home"
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
                question: 'Domanda 1',
                answer: 'Risposta 1',
              },
              {
                question: 'Domanda 2',
                answer: 'Risposta 2',
              }
            ]}
          />
        </Section>
      </Sections>
    </Page>
  );
}

export default Index;
