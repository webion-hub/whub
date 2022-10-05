import { ExpandMoreRounded, HelpRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useLanguage, useNextNavigator } from '@whub/wui';
import { ReactNode } from 'react';

interface QuestionProps {
  readonly title: string;
  readonly children: ReactNode;
}

function Question(props: QuestionProps) {
  return (
    <Box>
      <Accordion
        sx={{
          padding: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary">
            {props.children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function Faq() {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{
        marginInline: 2,
        marginTop: 10,
        marginBottom: 8,
        maxWidth: 800,
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: 2,
          borderRadius: '100%',
          background: (theme) => alpha(theme.palette.primary.light, 0.2),
        }}
      >
        <HelpRounded
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.primary.light,
          }}
        />
      </Stack>
      <Typography
        variant={isMd ? 'h2' : 'h3'}
        component="span"
        textAlign="center"
      >
        {t('faq')}
      </Typography>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          marginTop: (theme) => theme.spacing(12, '!important'),
          width: '100%',
        }}
      >
        <Question title={t('faq-q1')}>{t('faq-a1', true)}</Question>
        <Question title={t('faq-q2')}>{t('faq-a2', true)}</Question>
        <Question title={t('faq-q3')}>{t('faq-a3', true)}</Question>
        <Question title={t('faq-q4')}>
          {t('faq-a4', true)}&nbsp;
          <Link href="/techs" onClick={clickNavigate('/techs')}>
            {t('here')}
          </Link>
          .
        </Question>
        <Question title={t('faq-q5')}>{t('faq-a5', true)}</Question>
        <Question title={t('faq-q6')}>{t('faq-a6', true)}</Question>
      </Stack>
      <Typography variant="body1">
        {t('forget-anything')}&nbsp;
        <Link href="/contact-us" onClick={clickNavigate('/contact-us')}>
          {t('send-a-message')}
        </Link>
        &nbsp;{t('answer-in-48h')}
      </Typography>
    </Stack>
  );
}
