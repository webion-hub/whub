import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { BaseProps } from '@webion/ui-core';
import React from 'react';

export const Sections = React.forwardRef<HTMLDivElement, BaseProps>(
  (props, ref) => {
    const theme = useTheme();

    return (
      <Box
        ref={ref}
        sx={{
          width: '100%',
          '& > section::before': {
            display: 'block',
            content: "''",
            marginTop: '-' + theme.mixins.toolbar.height + 'px',
            height: theme.mixins.toolbar.height + 'px',
            visibility: 'hidden',
          },
          ...(props.sx as any),
        }}
      >
        {props.children}
      </Box>
    );
  }
);

Sections.displayName = 'Sections'