import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";
import ContactHome from "./ContactHome";

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
    //     flexDirection: "row",
    //     paddingInline:{xs: 0.3, sm: 2},
    //   }}
    //   >
    <Stack
      direction={{xs: "column", md: "row",}}
      sx={{
        minHeight: "470px",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        maxWidth: "100%",
        paddingInline:{xs: 0.3, sm: 2},
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          maxWidth: "100%",
          width: "700px",
          height: "clamp(300px, calc(95vh - 370px), 7000px)",
          marginLeft: 0,
          marginBlock: 4,
          paddingInline: 3,
          justifyContent:"center",
        }}
      >
        <Typography
          color="text.primary"
          variant="h4"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: {xs: "39px", sm: "24px !important"},
            textAlign: { sm: "center", xs: "center", md: "center" },
          }}
        >
          Mentre gli altri creano siti web e app
        </Typography><Typography
          color="text.primary"
          variant="h1"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: {xs: "39px", sm: "48px !important"},
            textAlign: { sm: "center", xs: "center", md: "center" },
          }}
        >
          Noi creiamo storie digitali di successo
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
      </Stack>
      <Box
      sx={{
        width: "500px",
        margin: "auto",
        maxWidth: "100%"
      }}>
        <ContactHome></ContactHome>
      </Box>
    </Stack>

    // </ResponserGrid>
  );
}
