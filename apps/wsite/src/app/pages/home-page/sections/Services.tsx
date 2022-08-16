import { Box, Button, Typography } from "@mui/material";
import { ImageCard, ResponserGrid, WuiGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <Box sx={{ 
      marginTop: 5,
      marginInline: 'auto', 
      width: "95%",
    }}>
      <Typography
        color="text.primary"
        variant="h2"
        sx={{ textAlign: "center" }}
      >
        {t("services-title")}
      </Typography>
      <ResponserGrid
        type="upper"
        size="md"
        sx={{
          justifyContent: "center",
          width: "fit-content",
          maxWidth: "100%",
          alignContent: "center",
          alignItems: "center",
          marginInline: 'auto',
          marginBlock: 6,
          "& > *": {margin: 1}, 
        }}
      >
        <ImageCard
          src="assets/images/firstCardIllustration.webp"
          title={t("services-service-1-title")}
          paragraph={t("services-service-1-description")}
        />
        <ImageCard
          src="assets/images/secondCardIllustration.webp"
          title={t("services-service-2-title")}
          paragraph={t("services-service-2-description")}
         />
        <ImageCard
          src="assets/images/thirdCardIllustration.webp"
          title={t("services-service-3-title")}
          paragraph={t("services-service-3-description")}
        />
      </ResponserGrid>
      <WuiGrid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
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
      </WuiGrid>
    </Box>
  );
}
