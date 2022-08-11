import { useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Sections } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";

const Section = styled('section')(({theme}) => ({
  paddingBlock: theme.spacing(8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: 'relative'
}))

export default function Homepage() {
  const theme = useTheme()

  return (
    <Sections 
      sx={{
        overflow: "hidden", 
        marginTop: 8
      }}>
      <Section 
        id="home" 
        sx={{ 
          background: theme.palette.background.default, 
          padding: 0
        }}
      >
        <Home/>
      </Section>
      <Section 
        id="who" 
        sx={{ 
          background: "#F0F0F0;",
          padding: 0
        }}
      >
        <MapSection/>
      </Section>
    </Sections>
  );
}