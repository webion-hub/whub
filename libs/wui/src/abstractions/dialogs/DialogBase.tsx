import { DialogOnClose } from "./DialogOnClose";

export interface DialogBase {
  readonly onClose: DialogOnClose,
  readonly open: boolean,
}
