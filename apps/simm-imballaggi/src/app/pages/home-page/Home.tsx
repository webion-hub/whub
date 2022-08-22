import { Grid, Typography, Stack, Box, Paper, useTheme } from "@mui/material";
import { ResponserGrid, useBackgroundWaves } from "@whub/wui";
import { useTranslation } from "react-i18next";
import HomeCard from "../../components/cards/HomeCard";

export default function Home() {
  const { t } = useTranslation();
  const theme = useTheme()
  const waves = useBackgroundWaves(theme.palette['primary'].dark)

  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      GridProps={{
        spacing: {xs: 1, md: 6},
        padding: 2,
        height: 920,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
      >
        <Box
          sx={{
            //background: 'url(assets/images/homepageImage.png)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
          }}
        >
                  <Typography
            variant="h4"
            textAlign={{xs: 'center', md: 'left'}}
          >
            <strong>
            {t("hero-title")}
            </strong>
          </Typography>
        </Box>
        <Grid
          container
          component={Paper}
          direction="column"
          sx={{
            padding: 4,
            position: 'relative',
            overflow: 'hidden',
            "& > *": { zIndex: 1 },
            "&::before": {
              content: "''",
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.2,
              top: 0,
              left: 0,
              zIndex: 0,
              transform: 'rotate(180deg)',
              ...waves,
            }
          }}
          width="auto"
        >
          <Typography
            variant="h6"
            textAlign={{xs: 'center', md: 'left'}}
          >
            {t("hero-description")}
          </Typography>
          <Stack
            direction="column"
            justifyContent="flex-start"
            spacing={2}
            sx={{
              marginTop: 4,
            }}
          >
            <HomeCard
              title={t("materials-card-title")}
              text={t("materials-description")}
              img="/assets/images/firstCard.png"
              buttonText={t("see")}
            />
            <HomeCard
              title={t("machines-card-title")}
              text={t("machines-description")}
              img="/assets/images/secondCard.png"
              buttonText={t("see")}
            />
          </Stack>
        </Grid>
      </Stack>
    </ResponserGrid>
  )
}
