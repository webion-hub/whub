import { styled } from "@mui/system";
import { Sections } from "@whub/wui";
import Home from "./Home";

const Section = styled('section')(({theme}) => ({
  paddingBlock: theme.spacing(8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: 'relative'
}))

export default function Homepage() {

  return (
    <Sections sx={{overflow: "hidden"}}>
      <Section 
        id="contacts" 
        sx={{ 
          background: theme => theme.palette['background'].default, 
          padding: 0
        }}
      >
        <Home/>
      </Section>
    </Sections>
  );
}