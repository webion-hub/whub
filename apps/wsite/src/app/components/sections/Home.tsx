import { ArrowForwardRounded, ArrowRightRounded, ArrowUpwardRounded } from "@mui/icons-material";
import { alpha, Box, Button, Stack, SvgIconTypeMap, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Parallax, ResponserGrid, RotatingText } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Home() {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction={{xs: "column", md: "row",}}
        sx={{
          width: '100%',
          position: 'relative',
          minHeight: "780px",
          justifyContent: "space-between",
          alignItems: "right",
          display: "flex",
          flexDirection: "row",
          marginTop: "60px",
          paddingInline:{xs: 0.6, sm: 1, md: 0},
        }}
      >
        <Parallax
          fromTop
          speedX={isMd ? 0.3 : 0.05}
          speedY={isMd ? -0.3 : -0.1}
          sx={{ zIndex: 1 }}
        >
          <Stack
            direction="column"
            alignItems="flex-end"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "clamp(300px, calc(95vh - 370px), 700px)",
              marginLeft: 0,
              marginBlock: 4,
              paddingInline: {xs: 1, sm: 1, md: 3},
            }}
          >
            <Typography
              color="text.primary"
              variant="h3"
              component="h4"
              textAlign="end"
              sx={{
                marginLeft: 0,
                fontWeight: "bold",
              }}
            >
              {t("landing-page-title")}
            </Typography>
            <Typography
              color="text.primary"
              variant="h1"
              component="h1"
              textAlign="end"
              sx={{
                marginLeft: 0,
                fontWeight: "bold",
              }}
            >
              {t("landing-page-subtitle-start")}
              <br/>
              <RotatingText
                labels={[t("stories"), t("results"), t("solutions"), t("services"),  t("products") ]}
                width={{xs: 160, sm: 360}}
                sx={{
                  color: theme => theme.palette.secondary.main,
                  textAlign: 'end',
                }}
              />
              {t("landing-page-subtitle-end")}
            </Typography>
            <ResponserGrid
              type="upper"
              size="sm"
              GridProps={{
                justifyContent: {
                  xs: "center",
                  md: "space-between"
                },
                sx: { "& > *": { width: {xs: '100%', md: '50%'}}},
                spacing: 2,
              }}
            >
            </ResponserGrid>
            <Stack
              direction={{xs: "column-reverse", md: 'row'}}
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 7 }}
            >
              <ArrowsAnimated
                Icon={isMd ? ArrowForwardRounded : ArrowUpwardRounded}
                direction={isMd ? 'right' : 'up'}
              />
              <Button
                variant="contained"
                href="/#contacts"
                size="large"
                onClick={() => (window.location.href = "/#contacts")}
                sx={{
                  textTransform: 'none',
                  textAlign: "center",
                }}
              >
                {t("services-consultation")}
              </Button>
            </Stack>

          </Stack>
        </Parallax>
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100%',
          top: 0,
          zIndex: 0,
        }}
      >
        <Parallax
          speedY={-0.5}
          fromTop
          sx={{
            background: theme => alpha(theme.palette['primary'].dark, 0.2)
          }}
        >
          <video
            autoPlay
            muted
            loop
            id="myVideo"
            style={{
              filter: 'brightness(0.3)',
              position: "fixed",
              backgroundColor: "rgba(0,0,0,.5) !important",
              width: '100vw',
              height: '100vh',
              maxHeight: '1800px',
              objectFit: 'cover',
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <source
              src="assets/images/pexels-cottonbro-8720752.mp4"
              type="video/mp4"
              style={{
                backgroundColor: "rgba(0,0,0,.5) !important",
                width: "130%",
              }}
            />
          </video>
        </Parallax>
      </Box>
    </>
  );
}


interface ArrowsAnimatedProps {
  readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>
  readonly direction: 'up' | 'down' | 'right' | 'left'
}


function ArrowsAnimated(props: ArrowsAnimatedProps) {

  const getDirection = () => {
    return {
      'up': 'translateY(-32px)',
      'down': 'translateY(32px)',
      'right': 'translateX(32px)',
      'left': 'translateX(-32px)',
    }[props.direction]
  }

  const animation = (delay: number) => ({
    animation: `fade-in 4000ms ease-in-out infinite`,
    animationDelay: delay + 'ms',
    "@keyframes fade-in": {
      "0%": {
        opacity: 0,
        transform: "scale(2) rotate(-90deg)"
      },
      "20%": {
        opacity: 1,
        transform: "rotate(0deg)"
      },
      "40%": {
        opacity: 0,
        transform: getDirection()
      },
      "100%": {
        opacity: 0,
        transform: getDirection()
      }
    }
  })

  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <props.Icon fontSize="large" color="secondary" sx={animation(250)}/>
      <props.Icon fontSize="large" color="secondary" sx={animation(500)}/>
      <props.Icon fontSize="large" color="secondary" sx={animation(750)}/>
    </Stack>
  )
}
