import { Box, Typography } from "@mui/material";
import { Parallax } from "@whub/wui";
import { useTranslation } from "react-i18next";
import RandomTextBackground from "../../../components/backgrounds/RandomTextBackground";

export default function AIDA() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          marginInline: 'auto',
          paddingBlock: 7.5,
          width: { md: 900, sm: "80%", xs: "90%" },
          maxWidth: "95%",
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ textAlign: "center" }}
        >
          {t("AIDA-attention")}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 6, textAlign: "justify" }}
        >
          {t("AIDA-interest")}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: "justify" }}
        >
          {t("AIDA-desire")}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: 0,
        }}
      >
      </Box>
    </>
  );
}
