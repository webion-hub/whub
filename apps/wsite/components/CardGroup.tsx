import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { TitleSectionLabel } from './TitleSectionLabel';

export interface CardGroupProps {
  readonly label: string | ReactNode;
  readonly title: string | ReactNode;
  readonly children: ReactNode;
}

export function CardGroup(props: CardGroupProps) {
  return (
    <Stack direction="column" margin={1}>
      <TitleSectionLabel label={props.label} title={props.title} />
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          marginTop: (theme) => theme.spacing(4),
          '& > *': {
            margin: 1,
            width: (theme) => `calc(33% - ${theme.spacing(2)})`,
          },
        }}
      >
        {props.children}
      </Stack>
    </Stack>
  );
}
