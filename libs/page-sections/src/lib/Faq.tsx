import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  SxProps,
  Box,
} from '@mui/material';
import { MaybeShow } from '@whub/wui';
import { ReactNode, useState } from 'react';

interface QuestionProps {
  readonly title: ReactNode;
  readonly expanded: boolean;
  readonly onChange: (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => void;
  readonly children: ReactNode;
}

export function Question(props: QuestionProps) {
  return (
    <Box>
      <Accordion expanded={props.expanded} onChange={props.onChange}>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography component="h3">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            "& > *": {
              color: theme => theme.palette.text.secondary
            }
          }}
        >
          {props.children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

interface IQuestion {
  readonly question: ReactNode;
  readonly answer: ReactNode;
}

type PanelKey = number | string;

type QuestionRenderComponent = (
  qustion: IQuestion,
  index: number,
  onChange: (panel: PanelKey, expanded: boolean) => void,
  panel: PanelKey
) => ReactNode;

export interface FaqProps {
  readonly title: string;
  readonly bottomLabel?: ReactNode;
  readonly icon?: ReactNode;
  readonly questions: IQuestion[];
  readonly renderComponent?: QuestionRenderComponent;
  readonly sx?: SxProps<Theme>;
  readonly questionBoxSx?: SxProps<Theme>;
}

export function Faq(props: FaqProps) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = useState<PanelKey>('');

  const handleChange = (panel: PanelKey, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : '');
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{
        width: '100%',
        maxWidth: 800,
        ...props.sx,
      }}
    >
      {props.icon}
      <Typography
        variant={isMd ? 'h2' : 'h3'}
        component="h2"
        textAlign="center"
      >
        {props.title}
      </Typography>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          marginTop: (theme) => theme.spacing(8, '!important'),
          width: '100%',
          ...props.questionBoxSx,
        }}
      >
        {props.questions.map((q, i) => (
          <MaybeShow
            key={i}
            show={!props.renderComponent}
            alternativeChildren={props.renderComponent?.(
              q,
              i,
              handleChange,
              expanded
            )}
          >
            <Question
              onChange={(_, newExpanded) => handleChange(i, newExpanded)}
              expanded={expanded === i}
              title={q.question}
            >
              {q.answer}
            </Question>
          </MaybeShow>
        ))}
      </Stack>
      <Typography variant="body1">{props.bottomLabel}</Typography>
    </Stack>
  );
}
