import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { Img, Slideshow, SlideshowItem } from "@whub/wui";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  readonly src: string,
  readonly description: string,
  readonly selected: boolean
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Stack
      direction="column"
      spacing={4}
    >
      <Img
        src={props.src}
        sx={{
           width: '100%',
           borderRadius: 4,
        }}
      />
      <Typography
        color="text.secondary"
        sx={{
          opacity: props.selected ? 1 : 0,
          transition: '0.25s opacity'
        }}
      >
        {props.description}
      </Typography>
    </Stack>
  )
}

export default function Projects() {
  const { t } = useTranslation();
  const theme = useTheme()
  const reduceSlideshow = useMediaQuery(theme.breakpoints.down("md"));

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

  const items: SlideshowItem[] = slideshowImagesProps.map(img => {
    return {
      onClick: () => window.open(img.url, '_blank'),
      item: (selected: boolean) =>
        <ProjectCard
          selected={selected}
          src={img.img}
          description={img.label}
        />
    }
  })

  return (
    <Box sx={{ height: "fit-content" }}>
      <Typography
        variant="h2"
        textAlign="center"
        color="white"
        sx={{ marginBottom: 5 }}
      >
        {t("projects-title")}
      </Typography>
      <Slideshow
        itemWidth={{width: reduceSlideshow ? 300 : 600}}
        containerWidth={{ width: "100vw" }}
        items={items}
      />
    </Box>
  );
}

