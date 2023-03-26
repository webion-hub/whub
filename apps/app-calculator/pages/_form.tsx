import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import RocketRoundedIcon from '@mui/icons-material/RocketRounded';

import { Button, Stack, Typography } from "@mui/material";
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { AddOnsSection } from '../sections/AddOnsAuthSection';
import { AuthSection } from '../sections/AuthSection';
import { DesignSection } from '../sections/DesignSection';
import { LanguageSection } from '../sections/LanguageSection';
import { PlatformSection } from '../sections/PlatformSection';
import { RevenueSection } from '../sections/RevenueSection';
import { usePages } from '../states/usePages';


export default function FormPage() {
  const { set: setPage } = usePages()

  return (
    <>
      <Section id="start">
        <Card>
          <Stack
            direction="column"
            alignItems="center"
            spacing={6}
          >
            <Typography
              component="h1"
              variant="h4"
              textAlign="center"
              sx={{
                "& > span": {
                  color: theme => theme.palette.primary.main,
                }
              }}
            >
              Calcolatore costo <span> App </span>
            </Typography>
            <Typography
              color="textSecondary"
              textAlign="center"
            >
              Con l'aiuto del nostro calcolatore dei costi per applicazioni mobile, puoi ottenere una stima dei costi che ti aspetteranno per la realizzazione della tua app.
              <br/>
              <br/>
              Include il design, lo sviluppo dell'applicazione, i contenuti e la pubblicazione.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<RocketRoundedIcon/>}
              href="#platform"
            >
              Inizia
            </Button>
          </Stack>
        </Card>
      </Section>
      <PlatformSection/>
      <DesignSection/>
      <AuthSection/>
      <LanguageSection/>
      <RevenueSection/>
      <AddOnsSection/>
      <Section>
        <Stack
          alignItems="flex-end"
          sx={{ width: '100%' }}
        >
          <Button
            variant='contained'
            size='large'
            endIcon={<ArrowForwardRoundedIcon/>}
            onClick={() => setPage('email')}
          >
            Avanti
          </Button>
        </Stack>
      </Section>
    </>
  )
}