import { Box, Button, Typography } from "@mui/material";
import { Parallax, useNavigator } from "@whub/wui";
import { useTranslation } from "react-i18next";
import RandomTextBackground from "../../../components/backgrounds/RandomTextBackground";
import parse from 'html-react-parser';

export default function AIDA() {
  const { t } = useTranslation();
  const {clickNavigate} = useNavigator();

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
          {t("we-do-websites")}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 6, textAlign: "justify" }}
        >
          {parse(t("websites-AIDA-p1-1"))}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: "justify" }}
        >
          {parse(t("websites-AIDA-p1-2"))}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: "justify" }}
        >
          {parse(t("websites-AIDA-p1-3"))}
        </Typography>
        <Box sx={{margin: "auto", width: "fit-content"}}>
          <Button
            variant="contained"
            href="/call#contacts"
            size="large"
            sx={{
              textTransform: 'none',
              textAlign: "center",
              marginTop: "40px",
              fontSize: "16px",
            }}
          >
            {t("start-now")}


          </Button>
        </Box>
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
