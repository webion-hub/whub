import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import DevicesRounded from '@mui/icons-material/DevicesRounded';
import FactoryRounded from '@mui/icons-material/FactoryRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { ButtonWithProgress, NextImg } from '@wui/components';
import Section from '@wui/layout/Section';
import { ISection } from '@wui/sections/abstractions/ISection';
import { useLanguage } from '@wui/wrappers';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

interface HomeSlide<T> {
  readonly key: T;
  readonly title: ReactNode | string;
  readonly src: string;
  readonly onClick: () => void;
}

type Slides = 'websites' | 'apps' | 'industry';

export function HomeWithServices(props: ISection) {
  const [pages, setPages] = useState<HomeSlide<Slides>[]>([]);
  const [page, setPage] = useState<HomeSlide<Slides>>();

  const router = useRouter();
  const theme = useTheme();
  const { t, tHtml, language } = useLanguage();
  const reduceTitle = useMediaQuery(theme.breakpoints.down(1000));

  useEffect(() => {
    setPages([
      {
        key: 'apps',
        title: tHtml('service2-desc'),
        src: '/assets/images/apps.jpg',
        onClick: () => router.push('/services/apps'),
      },
      {
        key: 'industry',
        title: tHtml('service3-desc'),
        src: '/assets/images/industry.jpg',
        onClick: () => router.push('/services/industry'),
      },
      {
        key: 'websites',
        title: tHtml('service1-desc'),
        src: '/assets/images/websites.jpg',
        onClick: () => router.push('/services/websites'),
      },
    ]);
  }, [language]);

  useEffect(() => {
    setPage(pages[0]);
  }, [pages]);

  const handlePage = (key: Slides) => {
    const newPage = pages.find((p) => p.key === key);
    if (!newPage) return;

    setPage(newPage);
  };

  const zoomAnimationName = `grow-img-${page?.key ?? ''}`;
  const zoomAnimationKeyframes = `@keyframes ${zoomAnimationName}`;

  return (
    <Section
      id={props.id}
      maxWidth="100vw"
      sx={{
        width: '100%',
        zIndex: 2,
        margin: 'auto',
        padding: 0,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '90vh',
          width: '100%',
          position: 'relative',
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={{
            minHeight: { xs: 800, sm: 600, md: 500 },
            '& > *': {
              color: '#fff',
            },
          }}
        >
          <Typography
            key={page?.key}
            variant={reduceTitle ? 'h3' : 'h2'}
            component="h1"
            textAlign="center"
            sx={{
              animation: `show-title 250ms ease-in-out`,
              '@keyframes show-title': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(64px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0px)',
                },
              },
            }}
          >
            {page?.title}
          </Typography>
          <Button
            onClick={page?.onClick}
            variant="first-action"
            endIcon={<ArrowForwardRounded />}
            sx={{ color: '#fff' }}
          >
            {t('learn-more')}
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{
            position: 'absolute',
            bottom: 16,
          }}
        >
          <ButtonWithProgress
            label={t('service2')}
            Icon={PhoneIphoneRounded}
            selected={page?.key === 'apps'}
            onSelectEnd={() => handlePage('industry')}
            onClick={() => handlePage('apps')}
            duration={5000}
          />
          <ButtonWithProgress
            label={t('service3')}
            Icon={FactoryRounded}
            selected={page?.key === 'industry'}
            onSelectEnd={() => handlePage('websites')}
            onClick={() => handlePage('industry')}
            duration={5000}
          />
          <ButtonWithProgress
            label={t('service1')}
            Icon={DevicesRounded}
            selected={page?.key === 'websites'}
            onSelectEnd={() => handlePage('apps')}
            onClick={() => handlePage('websites')}
            duration={5000}
          />
        </Stack>
      </Stack>
      <Box
        sx={{
          zIndex: -1,
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: `100%`,
          overflow: 'hidden',
        }}
      >
        {pages.map((p) => (
          <NextImg
            key={p.key}
            quality={100}
            src={p?.src}
            alt="slide-show-img"
            fill
            sizes="100vw"
            priority
            sx={{
              display: p.key === page?.key ? 'block' : 'none',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'scale(0)',
              [zoomAnimationKeyframes]: {
                '0%': {
                  transform: `scale(1)`,
                },
                '100%': {
                  opacity: 1,
                  transform: `scale(1.2)`,
                },
              },
              animation: `${zoomAnimationName} 15000ms ease-in-out forwards`,
            }}
          />
        ))}
      </Box>
    </Section>
  );
}
