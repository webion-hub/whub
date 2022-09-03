import { Grid, Typography, Stack, Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import { ResponserGrid, useBackgroundWaves, useNavigator } from "@whub/wui";
import { useTranslation } from "react-i18next";
import { homeCatergoryUrls } from "../../category-routes.config";
import HomeCard from "../../components/cards/HomeCard";

export default function Home() {
  const { t } = useTranslation();
  const { clickNavigate } = useNavigator()
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const waves = useBackgroundWaves(theme.palette['secondary'].dark)

  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      GridProps={{
        spacing: {xs: 1, md: 6},
        marginTop: { xs: theme.mixins.toolbar.height + 'px', md: '0px' },
        padding: 2,
        height: { xs: 'auto', md: '90vh'},
        maxHeight: 920,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: { xs: 500, lg: '100%' }
      }}
    >
      <Stack
        direction={{xs: "column", lg: "row"}}
        alignItems="center"
        spacing={2}
      >
        <Grid
          container
          component={isLg ? Paper : 'div'}
          direction="column"
          sx={{
            padding: 4,
            paddingInline: { xs: 0, lg: 4 },
            height: { xs: 'auto', lg: 320},
            position: 'relative',
            overflow: 'hidden',
            color: { xs: 'white', lg: 'unset' },
            "& > *": {
              zIndex: 1,
            },
            "&::before": {
              content: "''",
              display: { xs: 'none', lg: 'block' },
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
            variant="h4"
            textAlign={{xs: 'center', md: 'left'}}
          >
            <strong>
            {t("hero-title")}
            </strong>
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginTop: 2 }}
            textAlign={{xs: 'center', md: 'left'}}
          >
            {t("hero-description")}
          </Typography>

        </Grid>
        <Box
          sx={{
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
          }}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            spacing={2}
          >
            <HomeCard
              title={t("materials-card-title")}
              text={t("materials-description")}
              img="/assets/images/firstCard.webp"
              buttonText={t("see")}
              href={homeCatergoryUrls.materials}
              onClick={clickNavigate(homeCatergoryUrls.materials)}
            />
            <HomeCard
              title={t("machines-card-title")}
              text={t("machines-description")}
              img="/assets/images/secondCard.webp"
              buttonText={t("see")}
              href={homeCatergoryUrls.machines}
              onClick={clickNavigate(homeCatergoryUrls.machines)}
            />
          </Stack>
        </Box>
      </Stack>
    </ResponserGrid>
  )
}
