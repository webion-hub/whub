import { HelpRounded } from '@mui/icons-material';
import { alpha, Link, Stack, useTheme } from '@mui/material';
import { Faq, IQuestion } from '@whub/page-sections';
import { Section, useLanguage, useNextNavigator } from '@whub/wui';
import { netBackground } from '../backgrounds/netBackground';

interface FaqSectionProps {
  readonly questions: IQuestion[]
}

export function FaqSection(props: FaqSectionProps) {
  const theme = useTheme();
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();

  return (
    <Section
      id="faq"
      showBackground
      sx={{
        paddingTop: 0,
        paddingInline: 2,
      }}
      background={netBackground(theme)}
      backgroundSx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        opacity: theme.palette.mode === 'dark' ? 0.15 : 0.05,
      }}
    >
      <Faq
        bottomLabel={
          <>
            {t('forget-anything')}&nbsp;
            <Link href="/contact-us" onClick={clickNavigate('/contact-us')}>
              {t('send-a-message')}
            </Link>
            &nbsp;{t('answer-in-48h')}
          </>
        }
        questions={props.questions}
        title={t('faq')}
        sx={{
          marginInline: 2,
          marginTop: 10,
          marginBottom: 8,
        }}
        questionBoxSx={{
          marginTop: (theme) => theme.spacing(12, '!important'),
        }}
        icon={
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              padding: 2,
              borderRadius: '100%',
              background: (theme) =>
                alpha(theme.palette.primary.light, 0.2),
            }}
          >
            <HelpRounded
              fontSize="large"
              sx={{
                color: (theme) => theme.palette.primary.light,
              }}
            />
          </Stack>
        }
      />
    </Section>
  )
}
