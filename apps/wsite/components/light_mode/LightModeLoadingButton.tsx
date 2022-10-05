import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';

export const LightModeLoadingButton = styled(LoadingButton)(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor: 'rgba(0, 0, 0, 65%)',
  },
}));
