import { Box, Button, Typography } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
import { useTranslation } from "react-i18next";
import ContactHome from "./ContactHome";

export default function Home() {
  const { t } = useTranslation();

  return (
    <ResponserGrid
      type="upper"
      invert
      size="md"
      reverse="column"
      sx={{
        marginInline: 'auto',
        maxWidth: 1170,
        width: "100%",
        minHeight: "470px",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        paddingInline:{xs: 0.3, sm: 2},
      }}
      >
      <Box
        sx={{
          maxWidth: "100%",
          marginLeft: 0,
          marginBlock: 4,
          paddingInline: { xs: 2, md: 0 },
          justifyContent:"center",
        }}
      >
        <Typography
          color="text.primary"
          variant="h1"
          sx={{
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: "45px !important",
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
            fontSize: "18px !important",
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
      </Box>
      <Box>
        <ContactHome></ContactHome>
      </Box>
    </ResponserGrid>
  );
}
