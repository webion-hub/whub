import { Stack, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import SelectableCard from "@wui/components/SelectableCard"
import { Feature, FeatureKeys, usePreview } from "../states/usePreview"

interface SelectableCardForFeatureProps<T> {
  readonly featureKey: FeatureKeys,
  readonly feature: Feature,
  readonly value: T,
  readonly Icon: OverridableComponent<any>,
}

export function SelectableCardForFeature<T>({ featureKey, feature, value, Icon }: SelectableCardForFeatureProps<T>) {
  const { set, [featureKey]: state } = usePreview()
  const isSelected = state?.value === value

  const handleSelect = () => {
    set(featureKey, feature)
  }

  return (
    <SelectableCard
      onSelect={() => handleSelect()}
      selected={isSelected}
      sx={{ 
        minWidth: 'auto', 
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ 
          padding: 2,
          '& > *': {
            color: isSelected 
              ? '#fff' 
              : undefined 
          },
        }}
      >
        <Icon fontSize="large"/>
        <Typography>
          {feature.description}
        </Typography>
      </Stack>
    </SelectableCard>
  )
}