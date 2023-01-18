import { Theme, SxProps } from '@mui/material';
import { styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import uniqueId from 'lodash/uniqueId';
import { ChildrenProp, useOnScreen } from '@wui/core';
import { useLayout } from '../Layout/Layout';

const StyledSection = styled('section')(({ theme }) => ({
  paddingBlock: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
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
      rootMargin: '-50% 0% -50% 0%',
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
        props.background ?? theme.palette['secondaryBackground']?.default,
      ...props.backgroundSx,
    },
  };

  const backgroundSx = props.showBackground ? background : {};

  useEffect(() => {
    if (!sectionIn || props.ignoreSection)
      return;

    setSection(props.id ?? uniqueId());
  }, [sectionIn]);

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
