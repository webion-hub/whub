import { Button, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import { useState } from 'react';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { DialogBase } from '../../abstractions/dialogs/DialogBase';
import { DialogTitleCross } from '../dialogs/DialogTitleCross';

interface ImageCropperDialogProps extends DialogBase {
  readonly image: string,
  readonly onCrop: (cropData: string) => void,
}

export function ImageCropperDialog(props: ImageCropperDialogProps) {
  const [cropper, setCropper] = useState<Cropper>()

  const onCrop = () => {
    if (typeof cropper === "undefined")
      return

    const cropData = cropper.getCroppedCanvas().toDataURL()
    props.onCrop(cropData)
    props.onClose()
  }


  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitleCross
        onClose={props.onClose}
      >
        Modifica immagine
      </DialogTitleCross>
      <DialogContent>
        <Stack
          spacing={1}
          direction="column"
        >
          <Cropper
            style={{ maxHeight: 400, width: "100%" }}
            zoomTo={0}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={props.image}
            viewMode={1}
            minCropBoxHeight={64}
            minCropBoxWidth={64}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={setCropper}
            guides={true}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant='text'
          onClick={props.onClose}
        >
          Chiudi
        </Button>
        <Button
          variant='contained'
          onClick={onCrop}
        >
          Conferma
        </Button>
      </DialogActions>
    </Dialog>
  )
}
