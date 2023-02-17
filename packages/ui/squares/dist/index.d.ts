import { SxProps, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactNode } from 'react';
import { Theme as Theme$1 } from '@mui/system';
import { ChildrenProp } from '@webion/ui-core';

interface SquareButtonProps {
    readonly children?: ReactNode;
    readonly label?: string;
    readonly size?: number;
    readonly aspectRatio?: number;
    readonly stackSx?: SxProps<Theme>;
    readonly onClick?: () => void;
    readonly onDelete?: () => void;
    readonly icon?: OverridableComponent<any>;
}
declare function SquareButton(props: SquareButtonProps): JSX.Element;

interface SquareContainerProps {
    readonly sx?: SxProps<Theme$1>;
    readonly children?: ChildrenProp;
    readonly onDelete?: () => void;
    readonly size?: number;
    readonly aspectRatio?: number;
}
declare function SquareContainer(props: SquareContainerProps): JSX.Element;
declare namespace SquareContainer {
    var defaultProps: {
        size: number;
        aspectRatio: number;
    };
}

interface SquareImageContainerProps extends SquareContainerProps {
    readonly src: string;
}
declare function SquareImageContainer(props: SquareImageContainerProps): JSX.Element;

interface SquaresGridProps<T> {
    readonly title?: string;
    readonly elements: T[];
    readonly firstElement?: ReactNode;
    readonly children: (e: T) => ReactNode;
}
declare function SquaresGrid<T>(props: SquaresGridProps<T>): JSX.Element;

interface SquareAddAttachmentProps {
    readonly onAddPdf: (pdf: File) => void;
}
declare function SquareAddAttachment(props: SquareAddAttachmentProps): JSX.Element;

interface SquareAddImageProps {
    readonly onAddImage: (cropData: string) => void;
    readonly aspectRatio?: number;
}
declare function SquareAddImage(props: SquareAddImageProps): JSX.Element;

export { SquareAddAttachment, SquareAddAttachmentProps, SquareAddImage, SquareAddImageProps, SquareButton, SquareButtonProps, SquareContainer, SquareContainerProps, SquareImageContainer, SquareImageContainerProps, SquaresGrid, SquaresGridProps };
