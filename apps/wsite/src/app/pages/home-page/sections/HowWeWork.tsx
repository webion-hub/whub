import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CardWithBadge, ResponserGrid } from "@whub/wui";

export default function HowWeWork() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        marginInline: "auto",
        width: "100%",
        maxWidth: "100%",
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
          marginTop: "40px"
        }}
      >
        <CardWithBadge
          badgeXOffset={-1}
          badgeYOffset={-12}
          Icon={FlagRoundedIcon}
          title={t("step-1-title")}
          paragraph={t("step-1-description")}
          number={1}
        />
        <CardWithBadge
          badgeXOffset={-1}
          badgeYOffset={-12}        
          Icon={BrushRoundedIcon}
          title={t("step-2-title")}
          paragraph={t("step-2-description")}
          number={2}
        />
        <CardWithBadge
          badgeXOffset={-1}
          badgeYOffset={-12}                
          Icon={CodeRoundedIcon}
          title={t("step-3-title")}
          paragraph={t("step-3-description")}
          number={3}
        />
        <CardWithBadge
          badgeXOffset={-1}
          badgeYOffset={-12}  
          Icon={CheckCircleRoundedIcon}
          title={t("step-4-title")}
          paragraph={t("step-4-description")}
          number={4}
        />
      </ResponserGrid>
    </Box>
  );
}
