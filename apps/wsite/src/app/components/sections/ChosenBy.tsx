import { Divider, Stack, Typography } from "@mui/material";
import { Img } from "@whub/wui";
import { useTranslation } from "react-i18next";

export function ChosenBy() {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          maxWidth: 900,
          width: '100%'
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{
            "& > *": {
              userSelect: "none",
              padding: 2,
              height: "fit-content",
              filter: "grayscale(100%)",
            },
            width: "100%",
            paddingTop: { xs: 1, md: 0},
          }}
        >
          <Img src="assets/images/mentorzLogo.png" />
          <Img src="assets/images/corfuLogo.png" />
          <Img src="assets/images/kaireLogo.png" />
          <Img src="assets/images/simmLogo.png" />
          <Img src="assets/images/codyLogo.png" />
        </Stack>
      </Stack>
      <Divider
        sx={{
          position: 'absolute',
          width: '100vw',
          bottom: 0
        }}
      />
    </>
  )
}
