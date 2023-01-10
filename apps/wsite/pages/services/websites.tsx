import {
  BarChartRounded,
  BiotechRounded,
  BubbleChartRounded,
  CallRounded,
  EditRounded,
  FormatAlignLeftRounded,
  HelpRounded,
  PhoneIphoneRounded,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
  useOnScreen,
} from '@whub/wui';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { interval, take } from 'rxjs';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { CaseStudyLink } from '../../components/CaseStudyLink';
import { PageSettings } from '@whub/wui';
import { Faq } from '@whub/page-sections';
import { useTheme } from '@mui/material';
import { netBackground } from '../../components/backgrounds/netBackground';

interface StatisticProps {
  readonly value: number;
  readonly description: string | ReactNode;
}

function Statistic(props: StatisticProps) {
  const ref = useRef();
  const isOnScreen = useOnScreen(ref, { oneTime: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
    const sub = interval(10)
      .pipe(take(props.value - 1))
      .subscribe(() => {
        setValue((value) => value + 1);
      });

    return () => sub.unsubscribe();
  }, [isOnScreen]);

  return (
    <Stack
      ref={ref}
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ maxWidth: 250 }}
    >
      <Box position="relative">
        <CircularProgress
          role="progressbar"
          id="progressbar"
          title="progressbar"
          variant="determinate"
          value={value}
          size={200}
          sx={{
            circle: {
              strokeLinecap: 'round',
            },
            '& *': {
              transition: 'none !important',
            },
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {value}%
        </Typography>
      </Box>
      <Typography textAlign="center">{props.description}</Typography>
    </Stack>
  );
}

export default function Websites() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();
  const theme = useTheme();
  return (
    <Page>
      <PageSettings pageTranslationName="website" />
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('website')}
            title={t('website-page-title')}
            src="/assets/images/services/websites.jpg"
            alt="websites"
            description={tHtml('website-page-description')}
            actionComponent={
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<CallRounded />}
                href="/contact-us"
                onClick={clickNavigate('/contact-us')}
              >
                {t('contact-us')}
              </Button>
            }
          />
        </Section>
        <Section>
          <Stack direction="column" spacing={8}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ marginInline: 2 }}
            >
              {t('why-website')}
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              sx={{
                '& > *': {
                  margin: 2,
                },
              }}
            >
              <Statistic value={75} description={t('website-reason-1')} />
              <Statistic value={85} description={t('website-reason-2')} />
              <Statistic value={94} description={t('website-reason-3')} />
            </Stack>
          </Stack>
        </Section>
        <Section>
          <CardGroup
            label={t('website-features')}
            title={t('website-features-title')}
          >
            <IconCard
              icon={<BubbleChartRounded fontSize="large" />}
              title={t('website-feature-1-title')}
              paragraph={t('website-feature-1-description')}
            />
            <IconCard
              icon={<EditRounded fontSize="large" />}
              title={t('website-feature-2-title')}
              paragraph={t('website-feature-2-description')}
            />
            <IconCard
              icon={<PhoneIphoneRounded fontSize="large" />}
              title={t('website-feature-3-title')}
              paragraph={t('website-feature-3-description')}
            />
            <IconCard
              icon={<BiotechRounded fontSize="large" />}
              title={t('website-feature-4-title')}
              paragraph={t('website-feature-4-description')}
            />
            <IconCard
              icon={<BarChartRounded fontSize="large" />}
              title={t('website-feature-5-title')}
              paragraph={t('website-feature-5-description')}
            />
            <IconCard
              icon={<FormatAlignLeftRounded fontSize="large" />}
              title={t('website-feature-6-title')}
              paragraph={t('website-feature-6-description')}
            />
          </CardGroup>
        </Section>
        <Section>
          <CaseStudyLink
            title={t('example')}
            caseStudyTitle={t('simm-title')}
            caseStudyDescription={t('simm-short-description')}
            href="/studies/simm-imballaggi"
            src="/assets/images/projects/simm.png"
          />
        </Section>
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
            questions={[
              {
                question: t('website-faq-q1'),
                answer: tHtml('website-faq-a1'),
              },
              {
                question: t('website-faq-q2'),
                answer: tHtml('website-faq-a2'),
              },
              {
                question: t('website-faq-q3'),
                answer: tHtml('website-faq-a3'),
              },
              {
                question: t('website-faq-q4'),
                answer: tHtml('website-faq-a4'),
              },
              {
                question: t('website-faq-q5'),
                answer: tHtml('website-faq-a5'),
              },
              {
                question: t('website-faq-q6'),
                answer: tHtml('website-faq-a6'),
              },
            ]}
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
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
