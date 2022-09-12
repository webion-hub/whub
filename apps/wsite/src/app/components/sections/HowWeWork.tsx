import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { CardWithBadge, CardWithBadgeProps, Parallax, ResponserGrid, useOnScreen } from "@whub/wui";
import React, { useRef } from "react";
import RandomTextBackground from "../backgrounds/RandomTextBackground";

const HowWeWorkCard = React.forwardRef<HTMLDivElement, CardWithBadgeProps>((props: CardWithBadgeProps, ref) => {
  const theme = useTheme()
  const badgeColor = theme.palette['background']?.default

  return (
    <CardWithBadge
      ref={ref}
      {...props}
      badgeXOffset={5}
      badgeYOffset={-12}
      badgeColor={badgeColor}
      animationTimeout={400}
      animationDelay={(props.animationDelay ?? 0) + 800}
      sx={{
        color: theme => theme.palette['primary'].contrastText,
        background: theme => theme.palette['primary'].main,
        transform: 'scale(0)',
        "@keyframes grow-card": {
          "0%": {
            opacity: 0,
            transform: `scale(0)`,
          },
          "100%": {
            opacity: 1,
            transform: `scale(1)`,
          },
        },
        animation: props.animateBadge
          ? `grow-card ${300}ms ease-in-out forwards`
          : ''
        ,
        animationDelay: `${(props.animationDelay ?? 0)}ms`
      }}
    />
  )
})

export default function HowWeWork() {
  const { t } = useTranslation();
  const ref = useRef()
  const cardIn = useOnScreen(ref)


  return (
    <>
      <Box
        ref={ref}
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
          <HowWeWorkCard
            Icon={FlagRoundedIcon}
            title={t("step-1-title")}
            paragraph={t("step-1-description")}
            number={1}
            animationDelay={0}
            animateBadge={cardIn}
          />
          <HowWeWorkCard
            Icon={BrushRoundedIcon}
            title={t("step-2-title")}
            paragraph={t("step-2-description")}
            number={2}
            animationDelay={150}
            animateBadge={cardIn}
          />
          <HowWeWorkCard
            Icon={CodeRoundedIcon}
            title={t("step-3-title")}
            paragraph={t("step-3-description")}
            number={3}
            animationDelay={300}
            animateBadge={cardIn}
          />
          <HowWeWorkCard
            Icon={CheckCircleRoundedIcon}
            title={t("step-4-title")}
            paragraph={t("step-4-description")}
            number={4}
            animationDelay={450}
            animateBadge={cardIn}
          />
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
              ${theme.palette['background'].default} 0%,
              ${theme.palette['background'].default} 5%,
              rgba(0,0,0,0) 10%,
              rgba(0,0,0,0) 90%,
              ${theme.palette['background'].default} 95%,
              ${theme.palette['background'].default} 100%
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
