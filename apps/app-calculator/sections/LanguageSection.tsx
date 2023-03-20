import { Stack, Typography } from "@mui/material"
import Dropdown from "@wui/components/Dropdown"
import { Card } from "../components/Card"
import { IconTitle } from "../components/IconTitle"
import { Section } from "../components/Section"
import { Feature, usePreview } from "../states/usePreview"

import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded'

const langs = [1,2,3,4,5,6,7,8,9,10]

const languageCost = 300;
const getLangsFeature = (langs: number): Feature => {
  return { 
    value: langs, 
    description: `Integrazione di ${langs} ${langs == 1 ? 'lingua' : 'lingue'}`, 
    basePrice: langs * languageCost 
  }
}

usePreview.setState({ language: getLangsFeature(langs[0]) })

export function LanguageSection() {
  const { set, language } = usePreview()

  return (
    <Section id="language">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={TranslateRoundedIcon}
            text="Lingua"
          />
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: '100%' }}
          >
            <Typography>
              Quante lingua avrà la tua app?
            </Typography>
            <Dropdown
              value={language?.value as number}
              elements={langs}
              getValue={v => v.toString()}
              getOptionLabel={v => v.toString()}
              sx={{ width: '100%' }}
              onValueChange={v => set('language', getLangsFeature(v))}
            />
          </Stack>
        </Stack>
      </Card>
    </Section>
  )
}




