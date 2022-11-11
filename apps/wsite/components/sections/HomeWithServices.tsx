import {
  ArrowForwardRounded,
  DevicesRounded,
  FactoryRounded, PhoneIphoneRounded
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonBase,
  SvgIconTypeMap,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Stack } from '@mui/system';
import { NextImg, useLanguage } from '@whub/wui';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

interface HomeSlide<T> {
  readonly key: T;
  readonly title: ReactNode | string;
  readonly src: string;
  readonly onClick: () => void;
}

type Slides = 'websites' | 'apps' | 'industry';

export function HomeWithServices() {
  const [pages, setPages] = useState<HomeSlide<Slides>[]>([]);
  const [page, setPage] = useState<HomeSlide<Slides>>();

  const router = useRouter();
  const theme = useTheme();
  const { t, language } = useLanguage();
  const reduceTitle = useMediaQuery(theme.breakpoints.down(1000));

  useEffect(() => {
    setPages([
      {
        key: 'apps',
        title: t('service2-desc', true),
        src: '/assets/images/apps.jpg',
        onClick: () => router.push('/services/apps'),
      },
      {
        key: 'industry',
        title: t('service3-desc', true),
        src: '/assets/images/industry.jpg',
        onClick: () => router.push('/services/industry'),
      },
      {
        key: 'websites',
        title: t('service1-desc', true),
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

  const zoomAnimationName = `grow-img-${page?.key ?? ''}`
  const zoomAnimationKeyframes = `@keyframes ${zoomAnimationName}`

  return (
    <>
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
            minHeight: 800,
            '& > *': {
              color: '#fff',
            },
          }}
        >
          <Typography
            key={page?.key}
            variant={reduceTitle ? 'h3' : 'h2'}
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
        {
          pages.map(p => (
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
          ))
        }
      </Box>
    </>
  );
}

interface ButtonWithProgressProps {
  readonly label: string;
  readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  readonly onClick?: () => void;
  readonly selected?: boolean;
  readonly duration: number;
  readonly onSelectEnd?: () => void;
}

function ButtonWithProgress(props: ButtonWithProgressProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setAnimate(false);
      return;
    }

    setAnimate(true);
    const timeout = setTimeout(() => {
      props.onSelectEnd?.();
    }, props.duration);

    return () => clearTimeout(timeout);
  }, [props.selected]);

  const getDuration = () => {
    return props.selected ? props.duration : 300;
  };

  return (
    <ButtonBase
      onClick={props.onClick}
      sx={{
        borderRadius: 4,
        padding: 1.5,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            opacity: props.selected ? 1 : 0.7,
            '& > *': { color: '#fff' },
          }}
        >
          <props.Icon />
          <Typography variant="body1">{props.label}</Typography>
        </Stack>
        <Box
          sx={{
            width: 220,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.1)',
            position: 'relative',
            '&::after': {
              content: "''",
              borderRadius: 2,
              position: 'absolute',
              transition: `${getDuration()}ms width ease-in-out`,
              width: animate ? '100%' : '0%',
              height: '100%',
              left: 0,
              background: '#fff',
            },
          }}
        ></Box>
      </Stack>
    </ButtonBase>
  );
}
