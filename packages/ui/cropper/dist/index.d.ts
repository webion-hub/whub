import { DialogBase } from '@webion/ui-core';

interface ImageCropperDialogProps extends DialogBase {
    readonly aspectRatio?: number;
    readonly image: string;
    readonly onCrop: (cropData: string) => void;
}
declare function ImageCropperDialog(props: ImageCropperDialogProps): JSX.Element;

export { ImageCropperDialog as default };
