import { Box, Typography } from "@mui/material";
import { Slideshow } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();

  const slideshowImagesProps = [
    {
      img: "assets/images/kaire.webp",
      url: "https://kaire-automation.it/",
      label: t("project-3-description"),
    },
    {
      img: "assets/images/mentorz.webp",
      url: "https://mail.webion.it/sites/mentorz/",
      label: t("project-1-description"),
    },
    {
      img: "assets/images/yoga.webp",
      url: "https://it.yogacorfuholidays.com/",
      label: t("project-2-description"),
    },
  ]

  return (
    <Box sx={{ height: "fit-content", }}>
      <Typography
        variant="h2"
        textAlign="center"
        color="white"
        sx={{ marginBottom: 5 }}
      >
        Progetti
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
