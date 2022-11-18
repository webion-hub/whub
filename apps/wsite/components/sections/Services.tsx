import {
  DevicesRounded,
  FactoryRounded,
  PhoneIphoneRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useLanguage, useNextNavigator } from '@whub/wui';

import { useRef } from 'react';
import { CardGroup } from '../CardGroup';
import { IconCard } from '../cards/IconCard';

export default function Services() {
  const ref = useRef();
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
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
  );
}
