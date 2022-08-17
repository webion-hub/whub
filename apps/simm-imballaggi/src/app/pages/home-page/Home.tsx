import { Grid, Typography, Stack, Box } from "@mui/material";
import { ResponserGrid } from "@whub/wui";
import HomeCard from "../../components/cards/HomeCard";

export default function Home() {
  return (
    <ResponserGrid
      type="upper"
      size="md"
      reverse="column"
      GridProps={{
        spacing: {xs: 1, md: 6},
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          paddingBlock: 4,
          paddingInline: 6
        }}
        width="auto"
      >
        <Typography
          variant="h4"
          textAlign={{xs: 'center', md: 'left'}}
        >
          <strong>
            Costruzione, personalizzazione e vendita di macchine e materiali per l’imballaggio.
          </strong>
        </Typography>
        <Typography
          variant="h6"
          textAlign={{xs: 'center', md: 'left'}}
          sx={{marginTop: 4}}
        >
          La qualità del servizio è il risultato del massimo impegno che quotidianamente tutto il personale si pone, per poter offrire sempre il miglior prodotto e la massima professionalità lavorativa.
        </Typography>
        <Stack
          direction={{xs: "column", sm: 'row'}}
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            marginTop: 4,
            "& > *": {
              width: { xs: "100%", sm: '50%'}
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
      <Box
        sx={{
          background: 'url(assets/images/homepageImage.png)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: { xs: '20vh', md: 920}
        }}
      />
    </ResponserGrid>
  )
}
