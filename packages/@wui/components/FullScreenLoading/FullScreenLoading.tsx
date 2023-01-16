import { Backdrop, CircularProgress } from "@mui/material";

export interface FullScreenLoadingProps {
  readonly loading: boolean
}

export function FullScreenLoading(props: FullScreenLoadingProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: '10000 !important'
      }}
      open={props.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
