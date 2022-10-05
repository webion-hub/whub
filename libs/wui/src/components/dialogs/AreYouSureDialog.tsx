import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions } from "@mui/material"
import { DialogTitleCross } from "./DialogTitleCross"
import { DialogBase } from "../../abstractions/dialogs/DialogBase"

export interface AreYouSureDialogProps extends DialogBase {
  readonly loading?: boolean,
  readonly title: string,
  readonly onClick?: () => void,
}

export function AreYouSureDialog(props: AreYouSureDialogProps) {

  const onClose = () => {
    if(props.loading)
      return

    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
    >
      <DialogTitleCross
        onClose={onClose}
      >
        {props.title}
      </DialogTitleCross>
      <DialogActions>
        <Button
          disabled={props.loading}
          variant="text"
          onClick={onClose}
        >
          Annulla
        </Button>
        <LoadingButton
          loading={props.loading}
          variant="contained"
          onClick={props.onClick}
        >
          Conferma
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
