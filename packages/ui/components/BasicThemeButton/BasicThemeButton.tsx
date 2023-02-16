import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import { IconButton } from '@mui/material';
import useThemeChanger from '@webion/ui-wrappers/useThemeChanger';

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
