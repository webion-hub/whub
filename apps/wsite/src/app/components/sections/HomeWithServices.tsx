import { AppShortcutRounded, ArrowForwardRounded, DevicesRounded, FactoryRounded, IsoRounded } from "@mui/icons-material";
import { Box, Button, ButtonBase, Fade, LinearProgress, Slide, SvgIconTypeMap, Typography, useTheme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Stack } from "@mui/system";
import { MaybeShow } from "@whub/wui";
import { ReactNode, useEffect, useRef, useState } from "react";


interface HomeSlide<T> {
  readonly key: T,
  readonly title: ReactNode | string,
  readonly src: string,
  readonly onClick: () => void,
}

type Slides = 'websites' | 'apps' | 'industry'

export function HomeWithServices() {
  const theme = useTheme()
  const pages: HomeSlide<Slides>[] = [
    {
      key: 'websites',
      title: <>Beautiful custom websites<br/>for your business.</>,
      src: 'https://uploads-ssl.webflow.com/631af9277d04e651732adcbf/631afb6a9111531bf1046c8a_milad-fakurian-PjG_SXDkpwQ-unsplash.jpg',
      onClick: () => { return }
    },
    {
      key: 'apps',
      title: 'Optimized mobile apps.',
      src: 'https://uploads-ssl.webflow.com/631af9277d04e651732adcbf/631afb6ab499dabfcd945df3_gilles-lambert-pb_lF8VWaPU-unsplash.jpg',
      onClick: () => { return }
    },
    {
      key: 'industry',
      title: 'IOT for industries.',
      src: 'https://uploads-ssl.webflow.com/631af9277d04e651732adcbf/631afb6afc73fbbcf4a66ffb_compare-fibre-INNsF0Zz_kQ-unsplash.jpg',
      onClick: () => { return }
    }
  ]

  const [page, setPage] = useState(pages[2])
  const containerRef = useRef<any>()

  const handlePage = (key: Slides) => {
    const newPage = pages.find(p => p.key === key)
    if(!newPage)
      return

    setPage(newPage)
  }

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
            ref={containerRef}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
            sx={{ minHeight: 400 }}
          >
            <MaybeShow show={!!containerRef}>
              <Fade
                key={page.key}
                in
              >
                <Slide
                  direction="up"
                  container={containerRef.current}
                  in
                >
                  <Typography
                    variant="h1"
                    textAlign="center"
                  >
                    {page.title}
                  </Typography>
                </Slide>
              </Fade>
            </MaybeShow>
            <Button
              onClick={page.onClick}
              variant="first-action"
              endIcon={<ArrowForwardRounded/>}
            >
              Learn more
            </Button>
          </Stack>

        <Stack
          direction="row"
          flexWrap='wrap'
          justifyContent="center"
          sx={{
            position: 'absolute',
            bottom: 16
          }}
        >
          <ButtonWithProgress
            label="Web development"
            Icon={DevicesRounded}
            selected={page.key === 'websites'}
            onSelectEnd={() => handlePage('apps')}
            duration={5000}
          />
          <ButtonWithProgress
            label="App"
            Icon={AppShortcutRounded}
            selected={page.key === 'apps'}
            onSelectEnd={() => handlePage('industry')}
            duration={5000}
          />
          <ButtonWithProgress
            label="Industria 4.0"
            Icon={FactoryRounded}
            selected={page.key === 'industry'}
            onSelectEnd={() => handlePage('websites')}
            duration={5000}
          />
        </Stack>
      </Stack>
      <Box
        key={page.key}
        sx={{
          zIndex: -1,
          position: 'absolute',
          top: 0,
          width: '100vw',
          height: `100%`,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${page.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100%',
            transform: 'scale(0)',
            "@keyframes grow-img": {
              "0%": {
                transform: `scale(1)`,
              },
              "100%": {
                opacity: 1,
                transform: `scale(1.2)`,
              },
            },
            animation: `grow-img 15000ms ease-in-out forwards`
            ,
          }}
        />
      </Box>
    </>
  )
}


interface ButtonWithProgressProps {
  readonly label: string,
  readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>,
  readonly onClick?: () => void,
  readonly selected?: boolean,
  readonly duration: number,
  readonly onSelectEnd?: () => void
}

function ButtonWithProgress(props: ButtonWithProgressProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if(!props.selected) {
      setAnimate(false)
      return
    }

    setAnimate(true)
    setTimeout(() => {
      props.onSelectEnd?.()
    }, props.duration);
  }, [props.selected])

  const getDuration = () => {
    return props.selected
      ? props.duration
      : 300
  }

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
          sx={{ opacity: props.selected ? 1 : 0.7 }}
        >
          <props.Icon/>
          <Typography variant="body2">
            {props.label}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: 220,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.1)',
            position: 'relative',
            "&::after": {
              content: "''",
              borderRadius: 2,
              position: 'absolute',
              transition: `${getDuration()}ms width ease-in-out`,
              width: animate ? '100%' : '0%',
              height: '100%',
              left: 0,
              background: '#fff',
            }
          }}
        >
        </Box>
      </Stack>
    </ButtonBase>
  )
}
