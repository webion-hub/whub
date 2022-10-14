import { ArrowForwardRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { Slideshow } from '@whub/wui';
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  readonly src: string,
  readonly play: boolean,
  readonly label: string,
  readonly onClick?: (e: any) => void,
}

function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>()

  useEffect(() => {
    videoRef.current.currentTime = 0;

    props.play
     ? videoRef.current.play()
     : videoRef.current.pause()
  }, [props.play])

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        style={{
          width: '100%'
        }}
      >
        <source
          src={props.src}
          type="video/mp4"
          style={{
          }}
        />
      </video>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: 'absolute',
          bottom: 0,
          padding: 2,
          width: '100%',
          borderRadius: 1,
          background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
        }}
      >
        <Typography
          variant="h4"
          color="#fff"
        >
          {props.label}
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardRounded/>}
          onClick={props.onClick}
        >
          Vedi
        </Button>
      </Stack>

    </Stack>
  )
}

export default function Home() {
  return (
    <Stack
      direction="column"
      sx={{
        paddingBlock: 8,
        paddingInline: 4,
        width: '100%',
        minHeight: '85vh',
      }}
    >
      <Stack
        direction={{xs: "column", md: "row"}}
        spacing={8}
        sx={{
          paddingTop: { xs: 4, md: 0 },
          "& > *": {
            width: {xs: '100%', md: '50%'}
          }
        }}
      >
        <Stack
          direction="column"
          spacing={2}
        >
          <Typography
            variant="h2"
            component="h1"
          >
            Simm Imballaggi
          </Typography>
          <Typography color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis congue erat. Proin ultricies, mi vitae bibendum rutrum, dui nisl faucibus neque, sed venenatis elit purus vel metus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis congue erat. Proin ultricies, mi vitae bibendum rutrum, dui nisl faucibus neque, sed venenatis elit purus vel metus.
          </Typography>
        </Stack>
        <Slideshow
          color='red'
          containerWidth={{ width: '100%' }}
          itemWidth={{ width: '100%' }}
          items={[
            { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
            { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
            { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
            { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> }
          ]}
        />
      </Stack>
    </Stack>
  );
}
