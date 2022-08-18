import { Grid, Typography, Stack, Box } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";
import HomeCard from "../../components/cards/HomeCard";

export default function Home() {
  const { t } = useTranslation(); 
  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      GridProps={{
        spacing: {xs: 1, md: 6},
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          paddingBlock: 4,
          paddingInline: 6
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
          textAlign={{xs: 'center', md: 'left'}}
          sx={{marginTop: 4}}
        >
          {t("hero-description")}
        </Typography>
        <Stack
          direction={{xs: "column", sm: 'row'}}
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            marginTop: 4,
            "& > *": {
              width: { xs: "100%", sm: '50%'}
            }
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
      <Box
        sx={{
          background: 'url(assets/images/homepageImage.png)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: { xs: '20vh', md: 920}
        }}
      />
    </ResponserGrid>
  )
}