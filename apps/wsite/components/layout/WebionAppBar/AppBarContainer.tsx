import { useTheme } from "@mui/material";
import { ChildrenProps } from "@wui/core";
import { useLayout } from "@wui/layout";
import { AppBar } from "@wui/layout/AppBar";

export function AppBarContainer(props: ChildrenProps) {
  const { currentSection } = useLayout();
  const theme = useTheme();

  const appbarColor =
    theme.palette.layout?.appbar ?? theme.palette.primary.main;

  const isHome = currentSection === 'home';

  return (
    <AppBar
      sx={{
        border: 'none',
        transition: `250ms background ease-in-out`,
        background: isHome 
          ? 'transparent' 
          : appbarColor,
        '& > *': {
          color: (theme) => (isHome ? '#fff' : theme.palette.text.primary),
        },
        '::after': {
          content: '""',
          width: '100%',
          height: '1px',
          margin: 'auto',
          transition: `250ms transform ease-in-out`,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? '#000000c9'
              : theme.palette.grey[400],
          transform: isHome 
            ? 'scale(0%)' 
            : 'scale(100%)',
        },
      }}
    >
      {props.children}
    </AppBar>
  )
}
