import { Height } from "@mui/icons-material";
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
  position: 'relative',
  maxWidth: 1600,
  margin: '0 auto',

  "& > *": {
    zIndex: 1,
  }
}))

export default function Homepage() {
  const theme = useTheme()

  return (
    <Sections 
      sx={{
        overflow: "hidden", 
        marginTop: 10,
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
          "&::after": {
            content: "''",
            width: '100vw',
            position: 'absolute',
            height: '100%',
            zIndex: 0,
            background: "#F7F7F7;",
          }
        }}
      >
        <MapSection/>
      </Section>
    </Sections>
  );
}