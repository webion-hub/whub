import { ArrowForwardRounded } from '@mui/icons-material';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Img, Slideshow, SlideshowItem, useBackgroundWaves } from '@whub/wui';

interface SlideshowPageProps {
  readonly selected: boolean;
}

function SlideshowPage(props: SlideshowPageProps) {
  const waves = useBackgroundWaves('#eaeaea');

  return (
    <Stack
      spacing={8}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        transition: '0.25s, box-shadow',
        boxShadow: props.selected ? 'unset' : (theme) => theme.shadows[10],
        position: 'relative',
        overflow: 'hidden',
        height: 920,
        background: '#fff',
        '& > *': { zIndex: 1 },
        '&::after': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: 0,
          ...waves,
        },
      }}
    >
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: (theme) => theme.palette.primary.dark }}
          />
        }
        spacing={10}
      >
        <Stack direction="column" spacing={2} sx={{ width: 450 }}>
          <Typography variant="h2">
            <strong>Reggiatrici</strong>
          </Typography>
          <Typography>
            Ut sed venenatis augue. Nulla auctor pellentesque condimentum.
            Quisque malesuada libero in dui sagittis scelerisque. Donec sed
            lacus ut tellus eleifend condimentum id eu arcu. Curabitur volutpat
            feugiat turpis a tristique.
          </Typography>
          <Button variant="contained" endIcon={<ArrowForwardRounded />}>
            Scopri di più
          </Button>
        </Stack>
        <Img src="assets/images/secondCard.webp" sx={{ width: 400 }} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Paper
          sx={{
            width: 256,
            aspectRatio: '1',
          }}
        />
        <Paper
          sx={{
            width: 256,
            aspectRatio: '1',
          }}
        />
        <Paper
          sx={{
            width: 256,
            aspectRatio: '1',
          }}
        />
        <Paper
          sx={{
            width: 256,
            aspectRatio: '1',
          }}
        />
      </Stack>
    </Stack>
  );
}

const pages: SlideshowItem[] = [
  { item: (selected) => <SlideshowPage selected={selected} /> },
  { item: (selected) => <SlideshowPage selected={selected} /> },
  { item: (selected) => <SlideshowPage selected={selected} /> },
];

export default function Home() {
  return (
    <Stack
      sx={{
        width: '100%',
        background: '#eaeaea',
      }}
    >
      <Slideshow
        containerWidth={{ width: '100vw' }}
        itemWidth={{ width: '100vw' }}
        items={pages}
        color="#000"
      />
    </Stack>
  );
}
