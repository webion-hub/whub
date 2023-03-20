import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { Card } from "../components/Card";
import { IconTitle } from "../components/IconTitle";
import { Section } from "../components/Section";
import { usePreview } from "../states/usePreview";

import ExtensionIcon from '@mui/icons-material/Extension';

usePreview.setState({ 
  webapp: {
    ignore: true,
    description: "Sviluppo e integrazione sito web",
    pricePerPage: 500,
  }
})

usePreview.setState({ 
  api: {
    ignore: true,
    description: "Gestione e salvataggio dati utente",
    pricePerPage: 500
  } 
})

usePreview.setState({ 
  analytics: {
    ignore: true,
    description: "Analitiche",
    basePrice: 2000
  } 
})

usePreview.setState({ 
  integrations: {
    ignore: true,
    description: "Integrazione con i social",
    basePrice: 2000
  } 
})

usePreview.setState({ 
  ai: {
    ignore: true,
    description: "Implementazione intelligenze artificiali",
    basePrice: 8000
  } 
})

usePreview.setState({ 
  contents: {
    ignore: true,
    description: "Sviluppo contenuti app",
    pricePerPage: 150
  } 
})


export function AddOnsSection() {
  const { toggle, isChecked } = usePreview()

  return (
    <Section id="add-ons">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={ExtensionIcon}
            text="Add Ons"
          />
          <Stack
            direction="column"
            sx={{ "& > *": { marginTop: 2 } }}
          >
            <FormControlLabel 
              control={<Checkbox onChange={() => toggle('webapp')}/>}
              checked={isChecked('webapp')}
              label="L'app deve essere utilizzabile anche dal browser (es. Google Chrome)?" 
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('api')}/>}
              checked={isChecked('api')}
              label="Gli utenti avranno modo di salvare dei dati sull'app?"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('analytics')}/>}
              checked={isChecked('analytics')}
              label="Hai bisogno di analitche?"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('integrations')}/>}
              checked={isChecked('integrations')}
              label="L'app si deve integrare con i social?"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('ai')}/>}
              checked={isChecked('ai')}
              label="L'app avrà bisogno di un intelligenza artificiale (es. Riconoscimento di immagini)?"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('contents')}/>}
              checked={isChecked('contents')}
              label="Fornirai i contenuti dell'app?"
            />
          </Stack>
        </Stack>
      </Card>
    </Section>
  )
}




