import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const LightModeTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#d2d2d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d2d2d2',
    },
    '&:hover fieldset': {
      borderColor: '#acacac',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#acacac',
    },
  },
}));
