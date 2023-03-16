import { Link, LinkProps } from '@mui/material';

export const FooterLink = (props: LinkProps) => (
  <Link
    underline="hover"
    variant="body1"
    color="rgba(255, 255, 255, 0.7)"
    sx={{ width: 'fit-content' }}
    {...props}
  >
    {props.children}
  </Link>
);