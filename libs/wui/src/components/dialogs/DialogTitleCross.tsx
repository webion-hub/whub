import { CloseRounded } from "@mui/icons-material";
import { DialogTitle, DialogTitleProps, IconButton } from "@mui/material";
import { DialogOnClose } from "../../abstractions/dialogs/DialogOnClose";

export interface DialogTitleCrossProps extends DialogTitleProps {
  readonly onClose?: DialogOnClose;
}

export const DialogTitleCross = (props: DialogTitleCrossProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      {...other}
    >
      {props.children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseRounded />
      </IconButton>
    </DialogTitle>
  )
}
