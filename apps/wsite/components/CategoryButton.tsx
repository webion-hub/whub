import { ToggleButton } from '@mui/material';

interface CategoryButtonProps {
  readonly text: string;
  readonly category: string;
  readonly selected: boolean;
  readonly onChange: () => void;
}

export default function CategoryButton(props: CategoryButtonProps) {
  return (
    <ToggleButton
      size="medium"
      aria-label={props.category}
      sx={{
        textTransform: 'capitalize',
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: (theme) =>
            theme.palette.mode == 'light' ? 'rgb(21 52 178)' : 'rgb(21 52 178)',
          color: (theme) => (theme.palette.mode == 'light' ? '#fff' : '#fff'),
        },
      }}
      selected={props.selected}
      onChange={props.onChange}
      value={props.text}
    >
      {props.text}
    </ToggleButton>
  );
}
