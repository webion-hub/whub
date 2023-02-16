import Typography from '@mui/material/Typography';
import MaybeShow from '@webion/ui-components/MaybeShow';
import { ReactNode } from 'react';
import { ClickableCard, ClickableCardProps } from './ClickableCard';

export interface ImageCardProps extends ClickableCardProps {
  readonly img?: ReactNode;
  readonly title: string;
  readonly paragraph?: string | JSX.Element | JSX.Element[];
  readonly children?: ReactNode;
}

export function ImageCard(props: ImageCardProps) {
  const {
    img,
    title,
    paragraph,
    children,
    ...others
  } = props

  return (
    <ClickableCard {...others}>
      {img}
      <Typography variant="h5" component="h4" sx={{ marginBlock: 1 }}>
        {title}
      </Typography>
      <MaybeShow show={!!paragraph}>
        <Typography
          variant="body1"
          color="text.secondary"
          component="span"
        >
          {paragraph}
        </Typography>
      </MaybeShow>
      {children}
    </ClickableCard>
  );
}
