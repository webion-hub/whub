import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutContextProps {
    readonly setSection: (section?: string) => void;
    readonly currentSection?: string;
    readonly loading: boolean;
    readonly setLoading: (status: boolean) => void;
    readonly isSidebarOpen: boolean;
    readonly toggleSideBar: () => void;
    readonly setSiebarStatus: (status: boolean) => void;
}
interface LayoutProps {
    readonly AppBarComponent?: ReactNode;
    readonly FooterComponent?: ReactNode;
    readonly SidebarComponent?: ReactNode;
    readonly sx?: SxProps<Theme>;
    readonly children: ReactNode;
}
declare function Layout(props: LayoutProps): JSX.Element;
declare const useLayout: () => LayoutContextProps;

export { Layout, LayoutProps, useLayout };
