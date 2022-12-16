import {
  Button,
  Checkbox,
  FormControlLabel,
  ToggleButton,
} from '@mui/material';
import { useState } from 'react';

export default function CategoryButton(props) {
  const [selected, setSelected] = useState(false);
  return (
    <ToggleButton
      aria-label={props.category}
      sx={{
        borderRadius: 3,
        fontSize: 18,
        flexGrow: 1,
        paddingInline: 4,
        marginBlock: 3,
        paddingBlock: 1,
        textTransform: 'capitalize',
        '&.Mui-selected, &.M,ui-selected:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode == 'light' ? 'rgb(21 52 178)' : 'rgb(21 52 178)',
          color: (theme) => (theme.palette.mode == 'light' ? '#fff' : '#fff'),
        },
      }}
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      value={props.text}
    >
      {props.text}
    </ToggleButton>
  );
}
