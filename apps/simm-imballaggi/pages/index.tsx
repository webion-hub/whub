import { Page, Section, Sections } from '@whub/wui';
import Home from '../components/sections/Home';
import MapSection from '../components/sections/MapSection';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
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
          id="chi-siamo"
          showBackground
        >
          <MapSection/>
        </Section>
      </Sections>
    </Page>
  );
}

export default Index;
