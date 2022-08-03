import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CardWithBadge, CardWithBadgeProps, Parallax, ResponserGrid } from "@whub/wui";
import RandomTextBackground from "../../../components/backgrounds/RandomTextBackground";

const HowWeWorkCard = (props: CardWithBadgeProps) => {
  const theme = useTheme()
  const badgeColor = theme.palette['secondaryBackground']?.default

  return (
    <CardWithBadge
      badgeXOffset={-1}
      badgeYOffset={-12}  
      badgeColor={badgeColor}
      {...props}
    />
  )
}

export default function HowWeWork() {
  const { t } = useTranslation();


  return (
    <>
      <Box
        sx={{
          marginInline: "auto",
          width: "100%",
          maxWidth: "100%",
          zIndex: 1,
        }}
      >
        <Typography
          color="text.secondary"
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
            spacing: 2,
          }}
          sx={{
            marginBlock: 12,          
            marginTop: 40,
          }}
        >
          <HowWeWorkCard
            Icon={FlagRoundedIcon}
            title={t("step-1-title")}
            paragraph={t("step-1-description")}
            number={1}
          />
          <HowWeWorkCard
            Icon={BrushRoundedIcon}
            title={t("step-2-title")}
            paragraph={t("step-2-description")}
            number={2}
          />
          <HowWeWorkCard
            Icon={CodeRoundedIcon}
            title={t("step-3-title")}
            paragraph={t("step-3-description")}
            number={3}
          />
          <HowWeWorkCard
            Icon={CheckCircleRoundedIcon}
            title={t("step-4-title")}
            paragraph={t("step-4-description")}
            number={4}
          />
        </ResponserGrid>
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
        <Parallax
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
            digitsNum={10}
            digits={[
              {
                digit: 'webion',
                probability: 0.9,
              },
              {
                digit: 'console.log(webion)',
                probability: 0.1,
              },
            ]}
          />
        </Parallax>
      </Box>
    </>
  );
}
