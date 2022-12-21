import { Box, Typography } from '@mui/material';

export default function Quote(props) {
  return (
    <Box sx={{ borderLeft: '3px solid #1f4bff', paddingBlock: 2 }}>
      <blockquote>
        <Typography variant="h5" component="p" sx={{ fontWeight: 'normal' }}>
          {props.text}
        </Typography>
      </blockquote>
    </Box>
  );
}
