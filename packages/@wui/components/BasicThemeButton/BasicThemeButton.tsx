import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useThemeChanger } from '@wui/wrappers/Theme/Theme';

export function BasicThemeButton() {
  const { currentTheme, setTheme } = useThemeChanger();

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton onClick={toggleTheme}>
      {currentTheme === 'dark' ? (
        <LightModeRounded
          id="light mode button"
          aria-label="light mode button"
        />
      ) : (
        <DarkModeRounded
          id="light mode button"
          aria-label="light mode button"
        />
      )}
    </IconButton>
  );
}
