import { Box, Typography } from "@mui/material";
import { Slideshow } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  const slideshowImagesProps = [
    {
      img: "assets/images/mentorz.png",
      url: "https://www.mentorz.fr/",
      label: t("project-1-description"),
    },
    {
      img: "assets/images/yoga.png",
      url: "https://it.yogacorfuholidays.com/",
      label: t("project-2-description"),
    },
    {
      img: "assets/images/kaire.png",
      url: "https://kaire-automation.it/",
      label: t("project-3-description"),
    },
  ]

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
        imagesProps={slideshowImagesProps}
        iconSx={{
          color: "text.secondary",
          width: "fit-content",
          padding: 0,
        }}
      />
    </Box>
  );
}
