import PublicRounded from '@mui/icons-material/PublicRounded';
import { ListItemButton, ListItemText, useTheme } from '@mui/material';
import { useLayout } from '@webion/ui-layout';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import { SideBarCollapseItem } from './SideBarCollapseItem';

export function SideBarLanguageButton() {
  const { toggleSideBar } = useLayout();
  const { languages, setLanguage } = useLanguage();
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <SideBarCollapseItem
      main={{
        icon: <PublicRounded />,
        text: t('language'),
      }}
    >
      {languages.map((el, i) => {
        return (
          <ListItemButton sx={{ paddingLeft: 4 }} key={i}>
            <ListItemText
              secondary={el.langTranslation}
              key={i}
              secondaryTypographyProps={{ color: theme.palette.text.primary }}
              onClick={() => {
                setLanguage(el.code);
                toggleSideBar();
              }}
            />
          </ListItemButton>
        );
      })}
    </SideBarCollapseItem>
  );
}