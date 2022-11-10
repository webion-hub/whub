import {
  BarChartRounded,
  BiotechRounded,
  BubbleChartRounded,
  CallRounded,
  EditRounded, FormatAlignLeftRounded,
  PhoneIphoneRounded
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material';
import {
  NextImg,
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
  useOnScreen
} from '@whub/wui';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { interval, take } from 'rxjs';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';

interface StatisticProps {
  readonly value: number;
  readonly description: string | ReactNode;
}

function Statistic(props: StatisticProps) {
  const ref = useRef();
  const isOnScreen = useOnScreen(ref, { oneTime: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0)
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
  const { t } = useLanguage();

  return (
    <Page>
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('website')}
            title={t('website-page-title')}
            src="/assets/images/services/websites.jpg"
            alt="websites"
            description={t('website-page-description', true)}
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
          <Stack direction="column" alignItems="center" sx={{ width: '80%' }}>
            <Typography variant="h3">{t('recent-project-title')}</Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-evenly"
              sx={{
                width: '100%',
                marginTop: 4,
                '& > *': {
                  padding: 1,
                  width: '100%',
                  maxWidth: 450,
                },
              }}
            >
              <NextImg
                src="/assets/images/projects/simm.png"
                alt="simm"
                fill
                sx={{ objectFit: 'contain', position: 'relative !important' }}
              />
              <Stack direction="column" spacing={2}>
                <Typography variant="h4">{t('simm-title')}</Typography>
                <Typography>{t('simm-short-description')}</Typography>
                <Box>
                  <Button
                    variant="contained"
                    href="/studies/simm"
                    onClick={clickNavigate('/studies/simm')}
                  >
                    {t('learn-more')}
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
