import AttachFileRounded from "@mui/icons-material/AttachFileRounded";
import AttachmentUploader from "@webion/ui-uploaders/AttachmentUploader";
import { InputEvent } from "@webion/ui-core";
import SquareButton from "../SquareButton";

export interface SquareAddAttachmentProps {
  readonly onAddPdf: (pdf: File) => void
}

export function SquareAddAttachment(props: SquareAddAttachmentProps) {
  const onChange = (e: InputEvent) => {
    e.preventDefault();
    const files = e.target.files

    if(!files)
      return

    props.onAddPdf(files[0])
    e.target.value = ''
  }

  return (
    <SquareButton
      label="Aggiungi allegato"
      icon={AttachFileRounded}
    >
      <AttachmentUploader
        onChange={onChange}
      />
    </SquareButton>
  )
}
