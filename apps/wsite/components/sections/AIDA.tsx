import { Box, Typography } from '@mui/material';
import { Parallax, useLanguage } from '@whub/wui';

import RandomTextBackground from '../backgrounds/RandomTextBackground';

export default function AIDA() {
  const { t } = useLanguage();

  return (
    <>
      <Box
        sx={{
          marginInline: 'auto',
          paddingBlock: 7.5,
          width: { md: 900, sm: '80%', xs: '90%' },
          maxWidth: '95%',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="h2"
          color="text.primary"
          sx={{ textAlign: 'center' }}
        >
          {t('AIDA-attention')}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 6, textAlign: 'justify' }}
        >
          {t('AIDA-interest')}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: 'justify' }}
        >
          {t('AIDA-desire')}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: '0 !important',
        }}
      >
        <Parallax
          speedY={0.2}
          sx={{
            background: (theme) => `linear-gradient(0deg,
              ${theme.palette['background'].default} 0%,
              ${theme.palette['background'].default} 5%,
              rgba(0,0,0,0) 10%,
              rgba(0,0,0,0) 90%,
              ${theme.palette['background'].default} 95%,
              ${theme.palette['background'].default} 100%
            )`,
          }}
        >
          <RandomTextBackground
            textsNum={60}
            texts={[
              {
                text: '1',
                probability: 0.45,
              },
              {
                text: '0',
                probability: 0.45,
              },
              {
                text: 'w',
                probability: 0.1,
              },
            ]}
          />
        </Parallax>
      </Box>
    </>
  );
}
