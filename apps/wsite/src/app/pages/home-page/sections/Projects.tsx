import { Box, Typography } from "@mui/material";
import { Slideshow } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <Box sx={{ marginTop: 5, height: "fit-content" }}>
      <Typography
        variant="h2"
        textAlign="center"
        color="white"
        sx={{ marginBlock: 5 }}
      >
        {t("projects-title")}
      </Typography>
      <Slideshow
        urls={[
          "assets/images/mentorz.png",
          "assets/images/yoga.png",
          "assets/images/kaire.png",
        ]}
        texts={[
          t("project-1-description"),
          t("project-2-description"),
          t("project-3-description"),
        ]}
        links={[
          "https://www.mentorz.fr/",
          "https://it.yogacorfuholidays.com/",
          "https://kaire-automation.it/",
        ]}
        iconSx={{
          color: "text.secondary",
          width: "fit-content",
          padding: 0,
        }}
      />
    </Box>
  );
}
