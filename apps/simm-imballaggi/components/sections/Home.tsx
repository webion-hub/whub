import { ArrowForwardRounded, ChevronRight, ExpandMore } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { AppContext, useShop } from '@whub/apis-react';
import { Category } from '@whub/wshop-api';
import { MaybeShow, NextImg, Parallax, Slideshow } from '@whub/wui';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { categoryRoutes } from '../category-routes.config';
import { CategoryTree } from '../layout/SimmLayoutWithCategories';

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
        borderRadius: theme => theme.shape.borderRadius,
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
          borderRadius: theme => theme.shape.borderRadius,
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
  const { data } = useSWR(
    AppContext.shopApi.categories.url,
    async () => {
      const res = await AppContext.shopApi.categories.list()
      return res.data
    }
  )

  return (
    <Stack
      direction="column"
      spacing={8}
      sx={{
        marginTop: 4,
        paddingBlock: 8,
        paddingInline: 4,
        width: '100%',
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
            <strong>Simm Imballaggi</strong>
          </Typography>
          <Typography color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis congue erat. Proin ultricies, mi vitae bibendum rutrum, dui nisl faucibus neque, sed venenatis elit purus vel metus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis congue erat. Proin ultricies, mi vitae bibendum rutrum, dui nisl faucibus neque, sed venenatis elit purus vel metus.
          </Typography>
        </Stack>
        <Box
          sx={{
            position: 'relative',
            "&::before": {
              content: "''",
              width: '100%',
              aspectRatio: '1',
              position: 'absolute',
              background: 'red',
              backgroundColor: theme => theme.palette.primary.main,
              opacity: 0.1,
              boxShadow: theme => theme.shadows[10],
              transform: {
                xs: 'translate(20%, 0%) scale(2)',
                md: 'translate(20%, -70%) scale(2)'
              },
              left: '50%',
              top: '50%',
              borderRadius: '25%',
              zIndex: -1,
            },
          }}
        >
          <Slideshow
            autoScroll={{ timeout: 20000 }}
            color='#444'
            containerWidth={{ width: '100%' }}
            itemWidth={{ width: '100%' }}
            reduceFactor={0.9}
            items={[
              { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
              { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
              { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> },
              { item: (selected) => <VideoPlayer label="Ciao" play={selected} src="assets/videos/Assembly Line.mp4"/> }
            ]}
          />
        </Box>

      </Stack>
      <Stack
        direction={{ xs: "column", md: "row"}}
        spacing={2}
      >
        <CategoryCard category={categoryRoutes.machines}  categories={data}/>
        <CategoryCard category={categoryRoutes.materials}  categories={data}/>
      </Stack>
    </Stack>
  );
}

function CategoryCard(props: { categories: Category[], category: string }) {
  const categories = props.categories
    ?.filter(c => c.name.startsWith(props.category))

  return (
    <Paper sx={{ height: 'fit-content', overflow: 'hidden' }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: 2 }}
      >
        <NextImg
          width={150}
          height={150}
          alt="cateogry-img"
          src="/assets/images/firstCard.webp"
        />
        <Stack
          direction="column"
          spacing={1}
        >
          <Typography
            variant='h5'
          >
            Materiali per l'imballaggio
          </Typography>
          <Typography color="text.secondary">
            Tantissimi materiali pronta consegna e personalizzabili a richiesta
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        sx={{
          padding: 1,
          background: theme => theme.palette.secondaryBackground.default
        }}
      >
        <CategoryTree
          categories={categories}
          category=""
        />
      </Stack>
    </Paper>
  )
}
