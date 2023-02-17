import { StackProps, SelectProps, SxProps, Theme, SkeletonProps, SvgIconTypeMap, DialogTitleProps } from '@mui/material';
import * as React from 'react';
import React__default, { ReactNode, ReactElement } from 'react';
import { ChildrenProp, InputEvent, DialogOnClose } from '@webion/ui-core';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { InputBaseProps } from '@webion/ui-form';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { ImageProps } from 'next/image';

interface IStep {
    readonly content: ReactNode;
    readonly label: string;
}
interface StepperProps {
    readonly steps: IStep[];
    readonly activeStep: number;
    readonly StackProps?: StackProps;
    readonly keepMounted?: boolean;
}
declare function Stepper(props: StepperProps): JSX.Element;

interface TransitionProps {
    readonly in: boolean;
    readonly type: 'grow' | 'slide' | 'fade';
    readonly duration: number;
    readonly delay?: number;
    readonly children: ReactNode;
}
declare function Transition(props: TransitionProps): JSX.Element;

interface MaybeShopBaseProps {
    readonly children: ChildrenProp;
    readonly alternativeChildren?: ChildrenProp | ReactNode;
}
interface MaybeShowProps extends MaybeShopBaseProps {
    readonly show: boolean;
}
declare const MaybeShow: (props: MaybeShowProps) => ReactElement<any, string | React.JSXElementConstructor<any>>;

interface ISpeedDialAction {
    readonly name: string;
    readonly Icon: OverridableComponent<any>;
    readonly onClick: () => void;
}
interface SpeedDialProps {
    readonly actions: ISpeedDialAction[];
}
declare function SpeedDial(props: SpeedDialProps): JSX.Element;

interface SlideshowItem {
    readonly item: (selected: boolean) => ReactNode;
    readonly onClick?: (e: any) => void;
}
interface Width {
    readonly width: string | number;
    readonly maxWidth?: number;
}
interface AutoScroll {
    readonly timeout: number;
}
interface SlideshowProps {
    readonly items: SlideshowItem[];
    readonly itemWidth: Width;
    readonly containerWidth: Width;
    readonly color?: string;
    readonly reduceFactor?: number;
    readonly autoScroll?: AutoScroll;
    readonly hideControls?: boolean;
}
declare function Slideshow(props: SlideshowProps): JSX.Element;
declare namespace Slideshow {
    var defaultProps: {
        reduceFactor: number;
    };
}

interface ParagraphProps {
    readonly title: string;
    readonly children: ChildrenProp;
}
declare function Paragraph(props: ParagraphProps): JSX.Element;

interface DropdownPropsBase<T> {
    readonly getOptionLabel: (option: T) => string;
    readonly getValue: (option: T) => string;
    readonly elements: T[];
    readonly focused?: boolean;
    readonly value?: T;
    readonly selectSx?: SxProps<Theme>;
    readonly onValueChange?: (value: T) => void;
}
type DropdownProps<T> = DropdownPropsBase<T> & SelectProps;
declare function Dropdown<T>(props: DropdownProps<T>): JSX.Element;

interface PrivacyCheckboxProps extends InputBaseProps<boolean> {
    readonly privacyUrl: string;
    readonly color?: string;
}
declare const PrivacyCheckbox: React__default.ForwardRefExoticComponent<PrivacyCheckboxProps & React__default.RefAttributes<HTMLDivElement>>;

interface ImageUploaderProps {
    readonly onChange?: (e: InputEvent) => void;
}
declare function ImageUploader(props: ImageUploaderProps): JSX.Element;

interface AttachmentUploaderProps {
    readonly onChange?: (e: InputEvent) => void;
}
declare function AttachmentUploader(props: AttachmentUploaderProps): JSX.Element;

interface CookiePopupProps {
    readonly name: string;
    readonly privacyUrl: string;
    readonly usePixel?: boolean;
}
interface State extends SnackbarOrigin {
    readonly open: boolean;
}
declare function CookiePopup(props: CookiePopupProps): JSX.Element;

interface AutoSizeProps {
    readonly width?: string;
    readonly height?: string;
}
interface NextImgProps extends ImageProps {
    readonly sx?: SxProps<Theme>;
    readonly skeletonVariant?: SkeletonProps['variant'];
    readonly skeletonSx?: SkeletonProps['sx'];
    readonly auto?: AutoSizeProps;
}
declare function NextImg(props: NextImgProps): JSX.Element;

declare function BasicThemeButton(): JSX.Element;

interface LanguageDropdownButtonProps {
    readonly icon: OverridableComponent<any>;
}
declare const LanguageDropdownButton: React.ForwardRefExoticComponent<LanguageDropdownButtonProps & React.RefAttributes<HTMLDivElement>>;

interface FullScreenLoadingProps {
    readonly loading: boolean;
}
declare function FullScreenLoading(props: FullScreenLoadingProps): JSX.Element;

interface ButtonWithProgressProps {
    readonly label: string;
    readonly Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
    readonly onClick?: () => void;
    readonly selected?: boolean;
    readonly duration: number;
    readonly onSelectEnd?: () => void;
}
declare function ButtonWithProgress(props: ButtonWithProgressProps): JSX.Element;

interface DialogTitleCrossProps extends DialogTitleProps {
    readonly onClose?: DialogOnClose;
    readonly disabled?: boolean;
}
declare const DialogTitleCross: (props: DialogTitleCrossProps) => JSX.Element;

export { AttachmentUploader, AttachmentUploaderProps, BasicThemeButton, ButtonWithProgress, ButtonWithProgressProps, CookiePopup, CookiePopupProps, DialogTitleCross, DialogTitleCrossProps, Dropdown, DropdownProps, FullScreenLoading, FullScreenLoadingProps, ISpeedDialAction, IStep, ImageUploader, ImageUploaderProps, LanguageDropdownButton, LanguageDropdownButtonProps, MaybeShopBaseProps, MaybeShow, MaybeShowProps, NextImg, Paragraph, ParagraphProps, PrivacyCheckbox, PrivacyCheckboxProps, Slideshow, SlideshowItem, SlideshowProps, SpeedDial, SpeedDialProps, State, Stepper, StepperProps, Transition, TransitionProps };
