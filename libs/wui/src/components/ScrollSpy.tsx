import {
  Timeline,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { IconButton, Tooltip } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { MaybeShow } from './conditional_components/MaybeShow';
import { useLayout } from './Layout';

interface ScrollSpyDotProps {
  readonly Icon: OverridableComponent<any>;
  readonly selected?: boolean;
  readonly title: string;
  readonly href?: string;
  readonly onClick?: (e: any) => void;
}

const ScrollSpyDot = (props: ScrollSpyDotProps) => {
  return (
    <Tooltip arrow placement="right" title={props.title}>
      <TimelineDot
        sx={{
          padding: 0,
          transition: '0.25s background',
          background: (theme) =>
            props.selected
              ? theme.palette.primary.contrastText
              : theme.palette.primary.main,
        }}
      >
        <IconButton
          size="small"
          href={props.href ?? ''}
          onClick={props.onClick}
          sx={{
            transition: '0.25s color',
            color: (theme) =>
              props.selected
                ? theme.palette.primary.main
                : theme.palette.primary.contrastText,
          }}
        >
          <props.Icon />
        </IconButton>
      </TimelineDot>
    </Tooltip>
  );
};

interface ScrollSpyConnectorProps {
  readonly isLast?: boolean;
}

function ScrollSpyConnector(props: ScrollSpyConnectorProps) {
  return (
    <TimelineConnector
      sx={{
        marginTop: props.isLast ? -1 : 0,
        background: 'rgba(255, 255, 255, 0.2)',
      }}
    />
  );
}

interface ScrollSpyProps {
  readonly dots: ScrollSpyDotProps[];
}

export function ScrollSpy(props: ScrollSpyProps) {
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
        '& > *::before': { display: 'none' },
      }}
    >
      <ScrollSpyConnector />
      {props.dots.map((d, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator>
            <ScrollSpyDot {...d} />
            <MaybeShow show={i !== props.dots.length - 1}>
              <ScrollSpyConnector />
            </MaybeShow>
          </TimelineSeparator>
        </TimelineItem>
      ))}
      <ScrollSpyConnector isLast />
    </Timeline>
  );
}

interface NavigationScrollSpyItem {
  readonly title: string;
  readonly Icon: OverridableComponent<any>;
  readonly section: string;
}

interface NavigationScrollSpyProps {
  readonly dots: NavigationScrollSpyItem[];
}

export function NavigationScrollSpy(props: NavigationScrollSpyProps) {
  const { currentSection } = useLayout();

  return (
    <ScrollSpy
      dots={props.dots.map((d) => ({
        ...d,
        href: `#${d.section}`,
        selected: currentSection === d.section,
      }))}
    />
  );
}
