import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { useBackgroundWaves, useNavigator } from "@whub/wui";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const { clickNavigate } = useNavigator()
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const waves = useBackgroundWaves(theme.palette['secondary'].dark)

  return (
    <Stack
      sx={{
        height: 920,
      }}
    >

    </Stack>
  )
}
