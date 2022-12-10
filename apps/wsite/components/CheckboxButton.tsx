import { Button, Checkbox, FormControlLabel } from '@mui/material';

export default function CheckboxButton(props) {
  return (
    // <FormControlLabel
    //   sx={{
    //     '* > svg, * > input': {
    //       display: 'none',
    //       width: 0,
    //       height: 0,
    //       visibility: 'hidden',
    //     },
    //     paddingInline: 3,
    //     backgroundColor: 'yellow',
    //   }}
    //   control={<Checkbox />}
    //   label="Business"
    // ></FormControlLabel>
    <Button
      variant="outlined"
      sx={{
        borderRadius: 3,
        fontSize: 18,
        paddingInline: 4,
        paddingBlock: 1,
        // borderColor: (theme) => theme.palette.custom.light,
        // color: (theme) => theme.palette.custom.dark,
      }}
    >
      {props.text}
    </Button>
  );
}
