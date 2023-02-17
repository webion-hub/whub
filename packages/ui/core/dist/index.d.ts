import { SxProps, Theme } from '@mui/material';
import React, { ReactElement, ChangeEvent, EffectCallback, DependencyList } from 'react';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Theme as Theme$1 } from '@mui/system';

interface ChildrenProps {
    readonly children: ChildrenProp;
}
type ChildrenProp = ReactElement | ReactElement[];

interface BaseProps extends ChildrenProps {
    readonly sx?: SxProps<Theme>;
}

interface Coords {
    readonly x: number;
    readonly y: number;
}

type InputEvent = ChangeEvent<HTMLInputElement>;

type DialogOnClose = () => void;

interface DialogBase {
    readonly onClose: DialogOnClose;
    readonly open: boolean;
}

declare function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList | undefined): void;

interface Options {
    readonly oneTime?: boolean;
    readonly observeOptions?: IntersectionObserverInit;
}
declare function useOnScreen(ref: React.RefObject<any>, options?: Options): boolean;

declare const useSubject: <T>(initialValue: T) => BehaviorSubject<T>;
declare const useSubjectState: <T>(initialValue: T) => {
    state: T;
    setState: (value: T) => void;
    subject: BehaviorSubject<T>;
};
declare const useSubjectStateListener: <T>(subject: BehaviorSubject<T> | undefined, initialValue?: T | undefined) => T | undefined;

declare const useNextNavigator: () => {
    navigate: (url: string) => void;
    clickNavigate: (url: string) => (e: React.MouseEvent<any, any>) => void;
};

declare const useProgressiveImage: (src: string) => {
    srcLoaded: string | null;
    loading: boolean;
};

declare class Utils {
    static getRandomValue: (min: number, max: number) => number;
    static bytesToSize(bytes: number): string;
    static capitalizeFirstLetter(string: string): string;
    static stripHtml(html: string): string;
    static getWidth(width: string | number): string;
}

declare class Props {
    static setObjectDefaultProps<T>(defaultProps: T, props?: T): T & {};
}

declare class ColorUtils {
    static fade(theme: Theme$1, color: string, alpha: number): string;
}

export { BaseProps, ChildrenProp, ChildrenProps, ColorUtils, Coords, DialogBase, DialogOnClose, InputEvent, Props, Utils, useDidUpdateEffect, useNextNavigator, useOnScreen, useProgressiveImage, useSubject, useSubjectState, useSubjectStateListener };
