import { Box, Button, Typography } from "@mui/material";
import { Img, ResponserGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      sx={{
        marginInline: 'auto',
        maxWidth: 1170,
        width: "100%",
        minHeight: "800px",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline:{xs: 0, sm: 2},
      }}
      >
      <Box
        sx={{
          maxWidth: "600px",
          marginLeft: 0,
          marginBlock: 4,
          justifyContent: { sm: "center", md: "left" },
          width: { xs: "100%", md: "60%" }
        }}
      >
        <Typography
          color="text.secondary"
          variant="h1"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            textAlign: { sm: "center", xs: "center", md: "left" },
          }}
        >
          {t("title-bold")}
        </Typography>
        <Typography
          color="text.secondary"
          variant="h2"
          sx={{
            marginTop: {xs: 1, sm: 0},
            fontWeight: "bold",
            textAlign: { sm: "center", xs: "center", md: "left" },
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          color="text.primary"
          sx={{
            maxWidth: 600,
            marginTop: { xs: 2, sm: 2, md: 3 },
            textAlign: { sm: "center", xs: "center", md: "left" },
          }}
        >
          {t("subtitle")}
        </Typography>
        <ResponserGrid
          type="upper"
          size="sm"
          GridProps={{
            justifyContent: {
              xs: "center",
              md: "space-between"
            },
            GridItemProps: { sx: { "& > *": {width: '100%'}} },
            spacing: 2,
            autoWidth: true,
          }}
          sx={{
            marginTop: 4,
          }}
        >
          <Button
            size="large"
            color="primary"
            variant="contained"
            href="/#about-us"
            onClick={() => (window.location.href = "/#AIDA")}
            sx={{paddingBlock: 2}}
          >
            {t("main-button")}
          </Button>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            href="/#contacts"
            onClick={() => (window.location.href = "/#contacts")}
            sx={{boxShadow: "none", paddingBlock: 2}}
          >
            {t("contact-us-button")}
          </Button>
        </ResponserGrid>
      </Box>
      <Box sx={{ width: { xs: "40%", sm: "35%", md: "30%" } }}>
        <Img
          src="assets/images/homeIllustration.png"
          alt="study"
          sx={{ width: "100%", margin: "auto", display: 'none'}}
        />
      </Box>
    </ResponserGrid>
  );
}
