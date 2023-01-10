import { CardActionArea } from '@mui/material';
import { ReactNode } from 'react';
import { WebionCard } from './WebionCard';

export interface SelectableCardProps {
  readonly selected: boolean;
  readonly children: ReactNode;
  readonly onSelect: () => void;
}

export function SelectableCard(props: SelectableCardProps) {
  return (
    <WebionCard
      sx={{
        borderColor: (theme) =>
          props.selected
            ? theme.palette.primary.main + ' !important'
            : undefined,
      }}
    >
      <CardActionArea
        onClick={props.onSelect}
        sx={{
          backgroundColor: (theme) =>
            props.selected ? theme.palette.primary.main : 'inherit',
        }}
      >
        {props.children}
      </CardActionArea>
    </WebionCard>
  );
}
