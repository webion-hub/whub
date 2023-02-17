import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface ISection {
    readonly id?: string;
}

interface ChosenByProps extends ISection {
    readonly children: ReactNode;
    readonly sx?: SxProps<Theme>;
    readonly blackAndWhite?: boolean;
    readonly hideDivider?: boolean;
}
declare function ChosenBy(props: ChosenByProps): JSX.Element;

interface IQuestion {
    readonly question: ReactNode;
    readonly answer: ReactNode;
}
type PanelKey = number | string;
type QuestionRenderComponent = (qustion: IQuestion, index: number, onChange: (panel: PanelKey, expanded: boolean) => void, panel: PanelKey) => ReactNode;
interface FaqProps {
    readonly title: string;
    readonly bottomLabel?: ReactNode;
    readonly icon?: ReactNode;
    readonly questions: IQuestion[];
    readonly renderComponent?: QuestionRenderComponent;
    readonly sx?: SxProps<Theme>;
    readonly questionBoxSx?: SxProps<Theme>;
}
declare function Faq(props: FaqProps): JSX.Element;

export { ChosenBy, Faq, FaqProps, IQuestion, ISection };
