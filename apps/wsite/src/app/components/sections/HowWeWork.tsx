import { Box, Grow, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CardWithBadge, CardWithBadgeProps, Parallax, ResponserGrid } from "@whub/wui";
import RandomTextBackground from "../backgrounds/RandomTextBackground";
import React from "react";

const HowWeWorkCard = React.forwardRef<HTMLDivElement, CardWithBadgeProps>((props: CardWithBadgeProps, ref) => {
  const theme = useTheme()
  const badgeColor = theme.palette['secondaryBackground']?.default

  return (
    <CardWithBadge
      ref={ref}
      sx={{ background: theme => theme.palette['primary'].main }}
      badgeXOffset={5}
      badgeYOffset={-12}
      badgeColor={badgeColor}
      animateBadge
      animationDelay={1000}
      animationTimeout={1000}
      {...props}
    />
  )
})

export default function HowWeWork() {
  const { t } = useTranslation();


  return (
    <>
      <Box
        sx={{
          marginInline: "auto",
          width: "100%",
          maxWidth: "100%",
          zIndex: '2 !important',
        }}
      >
        <Typography
          color="text.primary"
          variant="h2"
          sx={{ textAlign: "center" }}
        >
          {t("how-we-work")}
        </Typography>
        <ResponserGrid
          type="upper"
          size="md"
          GridProps={{
            justifyContent: 'center',
            alignItems: "center",
            flexWrap: 'wrap'
          }}
          sx={{
            marginTop: { xs: 6, md: 12},
            marginBlock: 12,
            "& > *": {
              margin: 1
            }
          }}
        >
          <Grow
            in
            timeout={1000}
          >
            <HowWeWorkCard
              Icon={FlagRoundedIcon}
              title={t("step-1-title")}
              paragraph={t("step-1-description")}
              number={1}
            />
          </Grow>
          <Grow>
            <HowWeWorkCard
              Icon={BrushRoundedIcon}
              title={t("step-2-title")}
              paragraph={t("step-2-description")}
              number={2}
            />
          </Grow>
          <Grow>
            <HowWeWorkCard
              Icon={CodeRoundedIcon}
              title={t("step-3-title")}
              paragraph={t("step-3-description")}
              number={3}
            />
          </Grow>
          <Grow>
            <HowWeWorkCard
              Icon={CheckCircleRoundedIcon}
              title={t("step-4-title")}
              paragraph={t("step-4-description")}
              number={4}
            />
          </Grow>
        </ResponserGrid>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: '1 !important',
        }}
      >
        <Parallax
          speedY={0.2}
          sx={{
            background: theme => `linear-gradient(0deg,
              ${theme.palette['secondaryBackground'].default} 0%,
              ${theme.palette['secondaryBackground'].default} 5%,
              rgba(0,0,0,0) 10%,
              rgba(0,0,0,0) 90%,
              ${theme.palette['secondaryBackground'].default} 95%,
              ${theme.palette['secondaryBackground'].default} 100%
            )`
          }}
        >
          <RandomTextBackground
            textsNum={10}
            texts={[
              {
                text: 'webion',
                probability: 0.9,
              },
              {
                text: 'console.log(webion)',
                probability: 0.1,
              },
            ]}
          />
        </Parallax>
      </Box>
    </>
  );
}
