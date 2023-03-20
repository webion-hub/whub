import BrushRoundedIcon from '@mui/icons-material/BrushRounded';

import { Stack } from "@mui/system";
import { useState } from "react";
import { Card } from '../components/Card';
import { CustomSlider, Mark } from "../components/CustomSlider";
import { IconTitle } from "../components/IconTitle";
import { Section } from '../components/Section';
import { Feature, usePreview } from "../states/usePreview";

const designMarks = [
  { 
    value: 0,
    label: 'Ho già il design'
  },
  { 
    value: 300,
    label: 'Essenziale'
  },
  { 
    value: 600,
    label: 'Completo'
  },
  {
    value: 900,
    label: 'Complesso'
  }
]

const pagesMarks = [
  { 
    value: 1,
    label: '1'
  },
  { 
    value: 5,
    label: '5'
  },
  { 
    value: 10,
    label: '10'
  },
  {
    value: 15,
    label: '15'
  },
  {
    value: 20,
    label: '20'
  },
]

const getDesignFeature = (design: Mark, pages: Mark): Feature => {
  return {
    value: design.value, 
    pricePerPage: design.value / 2,
    basePrice: design.value,
    description: design.label
  }
}

const getPagesFeature = (pages: Mark): Feature => {
  return { 
    value: pages.value, 
    description: `Sviluppo - ${pages.label} Pagine`,
    basePrice: pages.value * 1000
  }
}

const initialState = {
  design: designMarks[1],
  pages: pagesMarks[0],
}

usePreview.setState({ design: getDesignFeature(initialState.design, initialState.pages) })
usePreview.setState({ pageDevelopment: getPagesFeature(pagesMarks[0])})

export function DesignSection() {
  const { set, design, pageDevelopment } = usePreview()

  const handleDesign = (m: Mark) => {
    if(!pageDevelopment)
      return

    set('design', getDesignFeature(m, getValue(pageDevelopment)))
  }

  const handlePages = (m: Mark) => {
    if(!design)
      return

    set('pageDevelopment', getPagesFeature(m))
    set('design', getDesignFeature(getValue(design), m))
  }

  const getValue = (f?: Feature): Mark => ({
    label: f?.description ?? '',
    value: (f?.value ?? 0) as number
  })

  return (
    <Section id="design">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={BrushRoundedIcon}
            text="Design"
          />
          <Stack
            direction="column"
            spacing={8}
          >
            <CustomSlider
              onChange={handleDesign}
              value={getValue(design).value}
              label='Stile'
              range={[0,900]}
              step={300}
              customMarks={designMarks}
            />

            <CustomSlider
              onChange={handlePages}
              value={getValue(pageDevelopment).value}
              label='Pagine (differenti)'
              range={[1,20]}
              step={1}
              customMarks={pagesMarks}
            />
          </Stack>

        </Stack>
      </Card>
    </Section>
  )
}