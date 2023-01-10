import { Typography } from '@mui/material';

export default function Title(props) {
  return (
    <Typography
      variant="h3"
      component="h1"
      sx={{
        textAlign: 'center',
        marginTop: 8,
      }}
    >
      {props.children}
    </Typography>
  );
}
