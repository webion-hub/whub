import { Theme, SxProps } from '@mui/system';
import { styled } from '@mui/material';
import { ChildrenProp } from '../abstractions/props/ChildrenProps';
import { useOnScreen } from '../hooks/useOnScreen';
import { useEffect, useRef } from 'react';
import { useLayout } from './Layout';

const StyledSection = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  margin: '0 auto',
  width: '100%',
  '& > *': {
    zIndex: 1,
  },
}));

export interface SectionProps {
  readonly id?: string;
  readonly ignoreSection?: boolean;
  readonly maxWidth?: number | string;
  readonly showBackground?: boolean;
  readonly background?: string;
  readonly backgroundSx?: React.CSSProperties;
  readonly sx?: SxProps<Theme>;
  readonly children?: ChildrenProp;
}

export function Section(props: SectionProps) {
  const ref = useRef<any>();
  const sectionIn = useOnScreen(ref, {
    observeOptions: {
      rootMargin: '0px 0px -50% 0px',
      threshold: 0.5,
    },
  });
  const { setSection } = useLayout();

  const background: SxProps<Theme> = {
    '&::after': {
      content: "''",
      width: '100vw',
      position: 'absolute',
      height: '100%',
      zIndex: 0,
      background: (theme) =>
        props.background ?? theme.palette['secondaryBackground'].default,
      ...props.backgroundSx,
    },
  };
  const backgroundSx = props.showBackground ? background : {};

  useEffect(() => {
    console.log(sectionIn);
    if (!sectionIn || props.ignoreSection) return;

    setSection(props.id ?? '');
  }, [sectionIn, props.id, props.ignoreSection]);

  return (
    <StyledSection
      id={props.id}
      ref={ref}
      sx={{
        maxWidth: (theme) => props.maxWidth ?? theme.layoutMaxWidth?.section,
        ...backgroundSx,
        ...props.sx,
      }}
    >
      {props.children}
    </StyledSection>
  );
}

Section.defaultProps = {
  id: '',
};
