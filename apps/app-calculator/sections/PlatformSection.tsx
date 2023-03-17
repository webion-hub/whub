import { Stack } from "@mui/material"
import { Card } from "../components/Card"
import { IconTitle } from "../components/IconTitle"
import { Section } from "../components/Section"
import { Feature, usePreview } from "../states/usePreview"

import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import AppShortcutRoundedIcon from '@mui/icons-material/AppShortcutRounded'
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import { SelectableCardForFeature } from "../components/SelectableCardForFeature"

export type Platform = 'ios' | 'android' | 'multi'

const platformFeature: PlatformsFeature = {
  android: { basePrice: 600, description: 'Android', value: 'android' },
  ios: { basePrice: 600, description: 'Ios', value: 'ios' },
  multi: { basePrice: 1000, description: 'Multi Piattaforma', value: 'multi' },
}

usePreview.setState({ platform: platformFeature['multi'] })


type PlatformsFeature = {
  [key in Platform]: Feature;
} 

export function PlatformSection() {
  return (
    <Section id="platform">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={AppShortcutRoundedIcon}
            text="Piattaforma"
          />
          <Stack
            direction="row"
            spacing={2}
          >
            <SelectableCardForFeature
              featureKey="platform"
              feature={platformFeature['ios']}
              value="ios"
              Icon={AppleIcon}
            />
            <SelectableCardForFeature
              featureKey="platform"
              feature={platformFeature['android']}
              value="android"
              Icon={AndroidIcon}
            />
            <SelectableCardForFeature
              featureKey="platform"
              feature={platformFeature['multi']}
              value="multi"
              Icon={DevicesOtherRoundedIcon}
            />
          </Stack>
        </Stack>
      </Card>
    </Section>
  )
}




