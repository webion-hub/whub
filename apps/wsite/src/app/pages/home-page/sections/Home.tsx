import { Box, Button, Typography } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
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
        paddingInline:{xs: 0.3, sm: 2},
      }}
      >
      <Box
        sx={{
          maxWidth: 600,
          marginLeft: 0,
          marginBlock: 4,
          paddingInline: { xs: 2, md: 0 },
          justifyContent: { sm: "center", md: "left" },
          width: { xs: "100%", md: "60%" }
        }}
      >
        <Typography
          color="text.primary"
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
          color="text.primary"
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
          color="text.secondary"
          sx={{
            maxWidth: 600,
            marginBottom: 4,
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
            sx: { "& > *": { width: {xs: '100%', md: '50%'}}},
            spacing: 2,
          }}
        >
          <Button
            size="large"
            color="primary"
            variant="contained"
            href="/#contacts"
            onClick={() => window.location.href = "/#contacts"}
            sx={{boxShadow: "none", paddingBlock: 2}}
          >
            {t("contact-us-button")}
          </Button>


        </ResponserGrid>
      </Box>
      <Box sx={{ width: { xs: "40%", sm: "35%", md: "30%" } }}>
      </Box>
    </ResponserGrid>
  );
}
