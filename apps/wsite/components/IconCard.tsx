import { alpha, Stack, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import { ImageCard } from './cards/ImageCard';

export interface ImageCardProps {
  readonly img?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly title: string;
  readonly paragraph?: string | JSX.Element | JSX.Element[];
  readonly children?: ReactNode;
  readonly buttonLabel?: string;
  readonly secondaryButtonLabel?: string;
  readonly onClick?: (e: any) => void;
  readonly onClickSecondary?: (e: any) => void;
}

export interface IconCardProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly paragraph?: string | JSX.Element | JSX.Element[];
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly buttonLabel?: string;
  readonly secondaryButtonLabel?: string;
  readonly iconBackgroundColor?: string;
  readonly onClick?: (e: any) => void;
  readonly onClickSecondary?: (e: any) => void;
}

export function IconCard(props: IconCardProps) {
  return (
    <ImageCard
      img={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 64,
            height: 64,
            margin: 1,
            marginBottom: 4,
            borderRadius: '100%',
            position: 'relative',
            background: (theme) =>
              props.iconBackgroundColor
                ? props.iconBackgroundColor
                : alpha(theme.palette.primary.main, 0.4),
          }}
        >
          {props.icon}
        </Stack>
      }
      {...props}
    />
  );
}
