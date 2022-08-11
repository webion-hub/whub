import { Section, Sections } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
  return (
    <Sections
      sx={{
        overflow: "hidden",
        marginTop: 10,
      }}>
      <Section
        id="home"
        sx={{ padding: 0 }}
      >
        <Home/>
      </Section>
      <Section
        id="who"
        showBackground
      >
        <MapSection/>
      </Section>
    </Sections>
  );
}
