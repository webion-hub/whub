import { Button, Grid, Typography } from "@mui/material";
import { ResponserGrid } from "@whub/wui";

export default function MapSection() {
  return (
    <ResponserGrid 
      type="upper" 
      size="md"
      GridProps={{
        justifyContent: "center",
        alignItems: "center",
        wrap: "nowrap",
        padding: 12
      }}
    >
      <Grid
        sx={{
          width: {sm: "100%", md:"40%", },
          marginRight: 4
        }}
      >
        <Typography 
          variant="h3"
          textAlign="center"
        >
          Chi siamo
        </Typography>
        <Typography 
          variant="body1"
          sx={{
            marginTop: 2,
            textAlign: {xs: "justify", md: "left"}
          }}
        >
          Simm imballaggi è una realtà specializzata nella costruzione, personalizzazione e vendita di macchine e materiali per l’imballaggio.<br/><br/>
          I prodotti trattati sono selezionati sulla base di un attento e continuo monitoraggio del mercato nazionale e internazionale, con l’obiettivo di migliorare costantemente qualità e tecnologia.<br/><br/>
          La qualità del servizio è il risultato del massimo impegno che quotidianamente tutto il personale si pone, per poter offrire sempre il miglior prodotto e la massima professionalità lavorativa.<br/><br/>
          Il cliente è l’obiettivo principale dell’azienda. Ad ogni esigenza si individuano rapidamente soluzioni specifiche che permettano di migliorare il lavoro, risparmiando tempo, risparmiando personale, migliorando l’immagine degli imballi, ottimizzando i costi.
        </Typography>
        <Grid 
          container
          alignItems="baseline"
        >  
          <Typography 
            variant="body2"
            sx={{
              marginTop: 8,
              marginRight: 2,
            }}
          >
            Contattaci per ricevere informazioni
          </Typography>
          <Button 
            size="small" 
            variant='contained'
            sx={{paddingInline: 4}}
            href="/contacts"
          >
            Contattaci
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        sx={{width: "auto"}}
      >
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.025110535519!2d11.4109574157301!3d44.535118402972245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477e2ce4005a1bf3%3A0x93f774b37f64da61!2sVia%20Gian%20Luigi%20Lazzari%2C%2018%2C%2040057%20Quarto%20Inferiore%20BO!5e0!3m2!1sit!2sit!4v1660216784064!5m2!1sit!2sit" 
          width="600" 
          height="450" 
          style={{ borderRadius: 8, border: 0}}
        />
        <Typography 
          variant="caption"
          textAlign="center"
          color="secondary"
        >
          Via Gian Luigi Lazzari 18, Quarto Inferiore (BO)
        </Typography>
      </Grid>
    </ResponserGrid>
  )
}
