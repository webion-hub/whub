import { Box, Button, Typography } from "@mui/material";
import { Parallax } from "@whub/wui";
import { useTranslation } from "react-i18next";
import RandomTextBackground from "../../../components/backgrounds/RandomTextBackground";

export default function AIDA() {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          marginInline: 'auto',
          paddingBlock: 7.5,
          width: { md: 900, sm: "80%", xs: "90%" },
          maxWidth: "95%",
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ textAlign: "center" }}
        >
          Creiamo siti web personalizzati per la tua azienda
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 6, textAlign: "justify" }}
        >
            Creiamo siti Web personalizzati per aziende di tutte le dimensioni . Il nostro obiettivo è aiutarti a raggiungere il tuo <b style={{color:"white"}}>pieno potenziale online</b> in modo che tu possa <b style={{color:"white"}}>far crescere la tua attività</b> e raggiungere i tuoi obiettivi.
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: "justify" }}
        >
          Comprendiamo che un sito Web è più di un semplice biglietto da visita; è uno strumento importante per <b style={{color:"white"}}>incrementare le vendite e convertire i lead</b>. Ecco perché ci prendiamo il tempo per conoscere la tua attività e capire le tue esigenze prima di iniziare a progettare. Vogliamo assicurarci che il tuo sito web non sia solo sbalorditivo, ma anche efficace nel raggiungere i tuoi obiettivi.
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ marginTop: 2.5, textAlign: "justify" }}
        >
          Se sei pronto a portare la tua attività al livello successivo con un sito Web personalizzato, contattaci oggi stesso. Saremo lieti di fornirti una <b style={{color:"white"}}>consulenza e parte del design <span style={{textDecoration: "underline"}}>gratuitamente</span></b>.
          <br/>Iniziamo a trasformare in realtà il sito web dei tuoi sogni!
        </Typography>
        <Box sx={{margin: "auto", width: "fit-content"}}>
          <Button
            variant="contained"
            href="/#contacts"
            size="large"
            onClick={() => (window.location.href = "/#contacts")}
            sx={{
              textTransform: 'none',
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            Iniziamo
          </Button>
        </Box>
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
      </Box>
    </>
  );
}
