import { Grid, Typography, Stack } from "@mui/material";
import { Img, ResponserGrid } from "@whub/wui";
import HomeCard from "../../components/cards/HomeCard";

export default function Home() {
  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      GridProps={{
        justifyContent: "space-between",
        alignItems: "center",
        wrap: "nowrap",
        width: "100%"
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          padding: 8
        }}
        width="auto"
      >
        <Typography
          variant="h4"
          fontWeight="700"
        >
          Costruzione, personalizzazione e vendita di macchine e materiali per l’imballaggio.
        </Typography>
        <Typography
          variant="h6"
          sx={{marginTop: 4}}
        >
          La qualità del servizio è il risultato del massimo impegno che quotidianamente tutto il personale si pone, per poter offrire sempre il miglior prodotto e la massima professionalità lavorativa.
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          sx={{
            marginTop: 4,
            "& > *": {
              width: "50%"
            }
          }}
        >
          <HomeCard
            title="Materiali per l'imballaggio"
            text="Tantissimi materiali pronta consegna e personalizzabili a richiesta"
            img="/assets/images/firstCard.png"
            buttonText="vedi"
          />
          <HomeCard
            title="Materiali per l'imballaggio"
            text="Vastissima gamma di macchinari automatici/semiautomatici per ogni esigenza"
            img="/assets/images/secondCard.png"
            buttonText="vedi"
          />
        </Stack>
      </Grid>
      <Img
        src="assets/images/homepageImage.png"
        width="100%"
        height="820px"
      />
    </ResponserGrid>
  )
}
