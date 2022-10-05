import { Divider, Stack, SxProps, Theme, Typography } from '@mui/material';
import { Img, NextImg } from '@whub/wui';

export function ChosenBy() {
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          maxWidth: 900,
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
          sx={{
            '& > *': {
              margin: 2,
              filter: 'grayscale(100%)',
            },
            width: '100%',
            paddingTop: { xs: 1, md: 0 },
          }}
        >
          <NextImg
            auto
            height="40px"
            alt="kaire"
            src="/assets/images/clients/kaire-logo.webp"
          />
          <NextImg
            auto
            height="40px"
            alt="bocconi"
            src="/assets/images/clients/bocconi-logo.png"
          />
          <NextImg
            auto
            height="40px"
            alt="simm"
            src="/assets/images/clients/simm-logo.png"
          />
          <NextImg
            auto
            height="30px"
            alt="mentorz"
            src="/assets/images/clients/mentorz-logo.png"
            sx={{ background: '#444' }}
          />
        </Stack>
      </Stack>
      <Divider
        sx={{
          position: 'absolute',
          width: '100vw',
          bottom: 0,
        }}
      />
    </>
  );
}
