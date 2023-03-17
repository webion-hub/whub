import { Stack } from "@mui/material"
import { Card } from "../components/Card"
import { IconTitle } from "../components/IconTitle"
import { Section } from "../components/Section"
import { Feature, usePreview } from "../states/usePreview"

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import MoneyOffRoundedIcon from '@mui/icons-material/MoneyOffRounded'
import PaidRoundedIcon from '@mui/icons-material/PaidRounded'
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded'

import { SelectableCardForFeature } from "../components/SelectableCardForFeature"
export type Revenue = 'paidApps' | 'shoppingInApp' | 'free'

type RevenuesFeature = {
  [key in Revenue]: Feature;
} 

const revenueFeature: RevenuesFeature = {
  paidApps: { basePrice: 1200, description: 'App a pagamento', value: 'paidApps' },
  shoppingInApp: { basePrice: 2000, description: 'Acquisti in app', value: 'shoppingInApp' },
  free: { basePrice: 0, description: 'App Gratuita', value: 'free' },
}

usePreview.setState({ revenue: revenueFeature['free'] })

export function RevenueSection() {
  return (
    <Section id="revenue">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={PaidRoundedIcon}
            text="Metodi di guadagno"
          />
          <Stack
            direction="row"
            spacing={2}
          >
            <SelectableCardForFeature
              featureKey="revenue"
              feature={revenueFeature['free']}
              value="free"
              Icon={MoneyOffRoundedIcon}
            />
            <SelectableCardForFeature
              featureKey="revenue"
              feature={revenueFeature['paidApps']}
              value="paidApps"
              Icon={AttachMoneyRoundedIcon}
            />
            <SelectableCardForFeature
              featureKey="revenue"
              feature={revenueFeature['shoppingInApp']}
              value="shoppingInApp"
              Icon={SubscriptionsRoundedIcon}
            />
          </Stack>
        </Stack>
      </Card>
    </Section>
  )
}




