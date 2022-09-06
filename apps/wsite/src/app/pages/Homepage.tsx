import { AccountTreeRounded, AddRounded, ContactPhoneRounded, GroupsRounded, HomeRounded, InfoRounded, SettingsSuggestRounded } from "@mui/icons-material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, ButtonBase, Divider, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Page, Section, Sections, useLayout } from "@whub/wui";
import { useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';
import { pcbBackground } from "../components/backgrounds/pcbBackground";
import AIDA from "../components/sections/AIDA";
import Contacts from "../components/sections/Contacts";
import Home from "../components/sections/Home";
import HowWeWork from "../components/sections/HowWeWork";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";



export default function Homepage() {
  const theme = useTheme();

  useEffect(() => {
    ReactPixel.track('ViewContent');
  }, []);

  return (
    <Page sx={{ marginTop: 0, margin: "Auto" }}>
      <NavigationScrollSpy
        dots={[
          { Icon: HomeRounded, title: 'Home', section: 'home' },
          { Icon: GroupsRounded, title: 'Cosa facciamo', section: 'about-us' },
          { Icon: InfoRounded, title: 'Servizi', section: 'services' },
          { Icon: AccountTreeRounded, title: 'Progetti', section: 'projects' },
          { Icon: SettingsSuggestRounded, title: 'Come lavoriamo', section: 'how-we-work' },
          { Icon: ContactPhoneRounded, title: 'Contattaci', section: 'contacts' },
        ]}
      />
      <Sections>
        <Section
          id="home"
          sx={{  width: "100%", zIndex: 2, margin: "auto"}}
        >
          <Home />
        </Section>
        <Section
          id="about-us"
          maxWidth="100%"
        >
          <AIDA />
        </Section>
        <Section
          id="services"
          showBackground
          background={pcbBackground(theme)}
          backgroundSx={{ opacity: 0.4 }}
        >
          <Services />
        </Section>
        <Section
          id="projects"
          showBackground
        >
          <Projects />
        </Section>
        <Section
          id="how-we-work"
          showBackground
          maxWidth="100%"
        >
          <HowWeWork />
        </Section>
        <Section
          id="contacts"
          maxWidth="100%"
          showBackground
          sx={{
            padding: 0,
            width: '100vw'
          }}
        >
          <Contacts />
        </Section>
      </Sections>
    </Page>
  );
}


interface ScrollSpyDotProps {
  readonly Icon: OverridableComponent<any>,
  readonly selected?: boolean,
  readonly title: string,
  readonly href?: string,
  readonly onClick?: (e: any) => void,
}

const ScrollSpyDot = (props: ScrollSpyDotProps) => {
  return (
    <Tooltip
      arrow
      placement="right"
      title={props.title}
    >
      <TimelineDot
        sx={{
          padding: 0,
          background: theme => props.selected
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main
        }}
      >
        <IconButton
          size="small"
          href={props.href ?? ''}
          onClick={props.onClick}
          sx={{
            color: theme => props.selected
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText
          }}
        >
          <props.Icon/>
        </IconButton>
      </TimelineDot>
    </Tooltip>
  )
}

interface ScrollSpyConnectorProps {
  readonly isLast?: boolean
}

function ScrollSpyConnector(props: ScrollSpyConnectorProps) {
  return (
    <TimelineConnector
      sx={{
        marginTop: props.isLast ? -1 : 0,
        background: 'rgba(255, 255, 255, 0.2)'
      }}
    />
  )
}

interface ScrollSpyProps {
  readonly dots: ScrollSpyDotProps[],
}

function ScrollSpy(props: ScrollSpyProps) {
  return (
    <Timeline
      sx={{
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '50%',
        left: 32,
        height: '50vh',
        transform: 'translateY(-50%)',
        "& > *::before": { display: 'none' }
      }}
    >
      <ScrollSpyConnector />
      {
        props.dots.map(d => (
          <TimelineItem>
            <TimelineSeparator>
              <ScrollSpyDot {...d}/>
              <ScrollSpyConnector/>
            </TimelineSeparator>
          </TimelineItem>
        ))
      }
      <ScrollSpyConnector isLast/>
    </Timeline>
  )
}


interface NavigationScrollSpyItem {
  readonly title: string,
  readonly Icon: OverridableComponent<any>,
  readonly section: string,
}

interface NavigationScrollSpyProps {
  readonly dots: NavigationScrollSpyItem[]
}

function NavigationScrollSpy(props: NavigationScrollSpyProps) {
  const { currentSection } = useLayout()

  return (
    <ScrollSpy
      dots={props.dots.map(d => ({
        ...d,
        href: `#${d.section}`,
        selected: currentSection === d.section,
      }))}
    />
  )
}
