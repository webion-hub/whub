import { AddAPhotoRounded } from "@mui/icons-material";
import { useState } from "react";
import { InputEvent } from "../../abstractions/events/InputEvent";
import { ImageCropperDialog } from "../images/ImageCropperDialog";
import { ImageUploader } from "../inputs/ImageUploader";
import { SquareButton } from "./SquareButton";

export interface SquareAddImageProps {
  readonly onAddImage: (cropData: string) => void
}

export function SquareAddImage(props: SquareAddImageProps) {
  const [image, setImage] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const onChange = (e: InputEvent) => {
    e.preventDefault();

    const files = e.target.files
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    if(!files)
      return

    reader.readAsDataURL(files[0]);
    setOpenCrop(true)
    e.target.value = ''
  };

  return (
    <SquareButton
      label="Aggiungi foto"
      icon={AddAPhotoRounded}
    >
      <ImageUploader
        onChange={onChange}
      />
      <ImageCropperDialog
        open={openCrop}
        image={image}
        onClose={() => setOpenCrop(false)}
        onCrop={(cropData) => props.onAddImage(cropData)}
      />
    </SquareButton>
  )
}
