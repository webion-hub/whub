import { Button, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { DialogBase } from '../../abstractions/dialogs/DialogBase';
import { DialogTitleCross } from '../dialogs/DialogTitleCross';

export interface ImageCropperDialogProps extends DialogBase {
  readonly image: string,
  readonly onCrop: (cropData: string) => void,
}

export function ImageCropperDialog(props: ImageCropperDialogProps) {
  const [cropper, setCropper] = useState<Cropper>()
  const [img, setImg] = useState<string>('')

  const onCrop = () => {
    if (typeof cropper === "undefined")
      return

    const cropData = cropper
      .getCroppedCanvas({
        width: 1000,
      })
      .toDataURL()

    props.onCrop(cropData)
    props.onClose()
  }

  const getImage = () => {
    const ctx = document
      .createElement('canvas')
      .getContext('2d')

    if(!ctx)
      return

    const img = new Image()
    img.src = props.image

    img.onload = () => {
      const border = img.width / 3

      ctx.canvas.height = img.height + border;
      ctx.canvas.width = img.width + border;

      ctx.drawImage(img, border / 2, border / 2)

      setImg(ctx.canvas.toDataURL())
    }
  }

  useEffect(() => {
    getImage()
  }, [props])

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
            src={img}
            viewMode={1}
            minCropBoxHeight={64}
            minCropBoxWidth={64}
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
