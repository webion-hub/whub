import { Page, Section, Sections } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
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

