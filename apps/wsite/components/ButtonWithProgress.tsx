import { Box, ButtonBase, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';

export interface ButtonWithProgressProps {
  readonly label: string;
  readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  readonly onClick?: () => void;
  readonly selected?: boolean;
  readonly duration: number;
  readonly onSelectEnd?: () => void;
}

export function ButtonWithProgress(props: ButtonWithProgressProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!props.selected) {
      setAnimate(false);
      return;
    }

    setAnimate(true);
    const timeout = setTimeout(() => {
      props.onSelectEnd?.();
    }, props.duration);

    return () => clearTimeout(timeout);
  }, [props.selected]);

  const getDuration = () => {
    return props.selected ? props.duration : 300;
  };

  return (
    <ButtonBase
      onClick={props.onClick}
      sx={{
        borderRadius: 4,
        padding: 1.5,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            opacity: props.selected ? 1 : 0.7,
            '& > *': { color: '#fff' },
          }}
        >
          <props.Icon />
          <Typography variant="body1">{props.label}</Typography>
        </Stack>
        <Box
          sx={{
            width: 220,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.1)',
            position: 'relative',
            '&::after': {
              content: "''",
              borderRadius: 2,
              position: 'absolute',
              transition: `${getDuration()}ms width ease-in-out`,
              width: animate ? '100%' : '0%',
              height: '100%',
              left: 0,
              background: '#fff',
            },
          }}
        ></Box>
      </Stack>
    </ButtonBase>
  );
}
