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
          width: "600px",
          minHeight: "300px",
          marginLeft: 0,
          marginBlock: 4,
          paddingInline: 3,
          justifyContent:"center",
        }}
      >
        <Typography
          color="text.primary"
          variant="h1"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: {xs: "35px", sm: "45px !important"},
            textAlign: { sm: "center", xs: "center", md: "center" },
          }}
        >
          Siti web personalizzati
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 600,
            marginBottom: 4,
            marginTop: { xs: 2, sm: 2, md: 3 },
            fontSize: {xs: "15px", sm: "18px !important"},
            textAlign: { sm: "center", xs: "center", md: "center" },
          }}
        >
          Semplifichiamo la vita degli imprenditori fornendo software personalizzato che renderà i loro clienti più felici
        </Typography>
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
