import { Box, Button, Grid, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";
import { AppBarLogo, ResponserGrid, RotatingText } from "@whub/wui";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { interval } from "rxjs";

export default function Home() {
  const { t } = useTranslation();

  return (
    // <ResponserGrid
    //   type="upper"
    //   size="md"
    //   reverse="column"
    //   sx={{
    //     marginInline: 'auto',
    //     maxWidth: 1170,
    //     width: "100%",
    //     minHeight: "470px",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     display: "flex",
    //     flexDirection: "row"
    //     paddingInline:{xs: 0.3, sm: 2},
    //   }}
    //   >
    <Stack
      direction={{xs: "column", md: "row",}}
      sx={{
        minHeight: "470px",
        justifyContent: "space-between",
        alignItems: "right",
        display: "flex",
        flexDirection: "row",
        maxWidth: "1152px",
        marginTop: "60px",
        paddingInline:{xs: 0.6, sm: 1, md: 0},
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-end"
        sx={{
          maxWidth: "100%",
          width: "fit-content",
          height: "clamp(300px, calc(95vh - 370px), 700px)",
          marginLeft: 0,
          marginBlock: 4,
          paddingInline:{xs: 0.3, sm: 1, md: 3, lg: 0},
          justifyContent:"center",
        }}
      >
        <Typography
          color="text.primary"
          variant="h4"
          textAlign="end"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: {xs: "20px", sm: "24px !important"},
          }}
        >
          {t("landing-page-title")}
        </Typography>
        <Typography
          color="text.primary"
          variant="h1"
          textAlign="end"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: {xs: "35px", sm: "48px !important"},
          }}
        >
          {t("landing-page-subtitle-start")}
          <br/>
          <RotatingText
            labels={[t("stories"), t("results"), t("solutions"), t("services"),  t("products") ]}
            width={{xs: 160, sm: 220}}
            sx={{
              color: 'yellow',
              marginRight: 1,
              textAlign: 'end',
            }}
          />
           {t("landing-page-subtitle-end")}
        </Typography>
        {/* <Typography
          color="text.secondary"
          sx={{
            maxWidth: "100%",
            marginBottom: 4,
            marginTop: { xs: 2, sm: 2, md: 3 },
            fontSize: {xs: "17px", sm: "20px !important"},
            textAlign: { sm: "center", xs: "center", md: "center" },
          }}
        >
          Un sito Web che non converte è una perdita di tempo e denaro. Lascia che ti aiutiamo a creare un sito web che non solo abbia un bell'aspetto, ma aiuti anche ad aumentare le tue vendite.        </Typography> */}
        <ResponserGrid
          type="upper"
          size="sm"
          GridProps={{
            justifyContent: {
              xs: "center",
              md: "space-between"
            },
            sx: { "& > *": { width: {xs: '100%', md: '50%'}}},
            spacing: 2,
          }}
        >
        </ResponserGrid>
        <Button
          variant="contained"
          href="/#contacts"
          size="large"
          onClick={() => (window.location.href = "/#contacts")}
          sx={{
            textTransform: 'none',
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          {t("services-consultation")}
        </Button>
      </Stack>

    </Stack>

    // </ResponserGrid>
  );
}
