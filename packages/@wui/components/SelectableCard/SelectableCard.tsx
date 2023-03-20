import { CardActionArea, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { ReactNode } from 'react';
import WebionCard from '../WebionCard';

export interface SelectableCardProps {
  readonly selected: boolean;
  readonly children: ReactNode;
  readonly onSelect: () => void;
  readonly sx?: SxProps<Theme>;
}

export function SelectableCard(props: SelectableCardProps) {
  return (
    <WebionCard
      sx={{
        borderColor: (theme) =>
          props.selected
            ? theme.palette.primary.main + ' !important'
            : undefined,
        ...props.sx
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
