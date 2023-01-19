import DevicesRounded from '@mui/icons-material/DevicesRounded';
import FactoryRounded from '@mui/icons-material/FactoryRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { useNextNavigator } from '@wui/core';
import Section from '@wui/layout/Section';
import { ISection } from '@wui/sections/abstractions/ISection';

import useLanguage from '@wui/wrappers/useLanguage';

import { useRef } from 'react';
import { pcbBackground } from '../../backgrounds/pcbBackground';
import { CardGroup } from '../cards/CardGroup';
import { IconCard } from '../cards/IconCard';

export default function Services(props: ISection) {
  const ref = useRef();
  const theme = useTheme()
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <Section
      id={props.id}
      showBackground
      background={pcbBackground(theme)}
      backgroundSx={{ opacity: theme.palette.mode === 'dark' ? 1 : 0.4 }}
    >
      <Box
        ref={ref}
        sx={{
          marginTop: 5,
          marginInline: 'auto',
        }}
      >
        <CardGroup label={t('services')} title={t('services-title')}>
          <IconCard
            title={t('service1-card-title')}
            paragraph={t('service1-card-desc')}
            buttonLabel={t('learn-more')}
            icon={<DevicesRounded fontSize="large" />}
            onClick={clickNavigate('/services/websites')}
          />
          <IconCard
            title={t('service2-card-title')}
            paragraph={t('service2-card-desc')}
            buttonLabel={t('learn-more')}
            icon={<PhoneIphoneRounded fontSize="large" />}
            onClick={clickNavigate('/services/apps')}
          />

          <IconCard
            title={t('service3-card-title')}
            paragraph={t('service3-card-desc')}
            buttonLabel={t('learn-more')}
            icon={<FactoryRounded fontSize="large" />}
            onClick={clickNavigate('/services/industry')}
          />
        </CardGroup>
      </Box>
    </Section>
  );
}
