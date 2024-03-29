import AddAPhotoRounded from "@mui/icons-material/AddAPhotoRounded";
import { InputEvent } from "@wui/core";
import ImageUploader from "@wui/components/ImageUploader";
import ImageCropperDialog from "@wui/cropper";
import { useState } from "react";
import SquareButton from "../SquareButton";
import FileResizer from "react-image-file-resizer";

export interface SquareAddImageProps {
  readonly onAddImage: (cropData: string) => void,
  readonly aspectRatio?: number
}

export function SquareAddImage(props: SquareAddImageProps) {
  const [image, setImage] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const onChange = (e: InputEvent) => {
    e.preventDefault();

    const files = e.target.files

    if(!files)
      return

    resize(files?.[0])
      .then(i => {
        setImage(i)
        setOpenCrop(true)
        e.target.value = ''
      })
  };

  const resize = (file: File) => new Promise<string>(res => {
    FileResizer.imageFileResizer(
      file,
      1000,
      1000,
      'webp',
      100,
      0,
      uri => res(uri as string),
      'base64'
    )
  })

  return (
    <SquareButton
      label="Aggiungi foto"
      icon={AddAPhotoRounded}
      aspectRatio={props.aspectRatio}
    >
      <ImageUploader
        onChange={onChange}
      />
      <ImageCropperDialog
        aspectRatio={props.aspectRatio}
        open={openCrop}
        image={image}
        onClose={() => setOpenCrop(false)}
        onCrop={(cropData) => props.onAddImage(cropData)}
      />
    </SquareButton>
  )
}
