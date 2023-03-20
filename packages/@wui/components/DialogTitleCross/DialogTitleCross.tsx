import CloseRounded from "@mui/icons-material/CloseRounded";
import { Box, DialogTitle, DialogTitleProps, IconButton } from "@mui/material";
import { DialogOnClose } from "@wui/core";

export interface DialogTitleCrossProps extends DialogTitleProps {
  readonly onClose?: DialogOnClose;
  readonly disabled?: boolean;
}

export const DialogTitleCross = (props: DialogTitleCrossProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      {...other}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...other.sx
      }}
    >
      {props.children}
      <Box
        sx={{
          marginRight: -2,
          marginTop: -0.5,
          marginLeft: 0.5
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={props.disabled}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
      </Box>
    </DialogTitle>
  )
}
