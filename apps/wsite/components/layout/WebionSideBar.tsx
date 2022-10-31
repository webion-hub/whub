import {
  BasicThemeButton,
  ChildrenProp,
  Language,
  SideBar,
  SideBarItem,
  useLanguage,
  useNextNavigator,
  useSidebar,
} from '@whub/wui';

import {
  AppShortcutRounded,
  CloseRounded,
  ComputerRounded,
  DevicesRounded,
  FactoryRounded,
  GroupsRounded,
  PublicRounded,
} from '@mui/icons-material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { ReactNode, useState } from 'react';

export default function WebionSideBar() {
  const { t } = useLanguage();
  const { toggleSidebar } = useSidebar();
  const { clickNavigate } = useNextNavigator();

  const buttons = [
    {
      text: t('navbar-button1'),
      icon: HomeRoundedIcon,
      href: '/',
    },
    {
      text: t('navbar-button3'),
      icon: AssignmentTurnedInRoundedIcon,
      href: '/projects',
    },
    {
      text: t('navbar-button4'),
      icon: GroupsRounded,
      href: '/who-we-are',
    },
    {
      text: t('navbar-button5'),
      icon: ComputerRounded,
      href: '/techs',
    },
    {
      text: t('contact-us'),
      icon: LocalPhoneRoundedIcon,
      href: '/contact-us',
      afterLanguage: true,
    },
  ];

  const createButtons = () => {
    return buttons.map((btn, i) => {
      return (
        <SideBarItem
          key={i}
          icon={<btn.icon />}
          text={btn.text}
          onClick={clickNavigate(btn.href)}
        />
      );
    });
  };

  return (
    <SideBar>
      <Box
        sx={{
          float: 'right',
          marginRight: 1,
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <CloseRounded />
        </IconButton>
      </Box>

      {createButtons()}
      <SideBarCollapseItem
        main={{
          text: t('navbar-button2'),
          icon: <DesignServicesRoundedIcon />,
        }}
      >
        <SideBarItem
          text={t('service1')}
          icon={<DevicesRounded />}
          onClick={clickNavigate('/services/websites')}
        />
        <SideBarItem
          text={t('service2')}
          icon={<AppShortcutRounded />}
          onClick={clickNavigate('/services/apps')}
        />
        <SideBarItem
          text={t('service3')}
          icon={<FactoryRounded />}
          onClick={clickNavigate('/services/industry')}
        />
      </SideBarCollapseItem>
      <SideBarLanguageButton />
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 8,
        }}
      >
        <BasicThemeButton />
      </Box>
    </SideBar>
  );
}

interface SideBarCollapseItemProps {
  readonly children: ReactNode;
  readonly main: {
    text: string;
    icon: ChildrenProp;
  };
}

function SideBarCollapseItem(props: SideBarCollapseItemProps) {
  const [open, setOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const theme = useTheme();

  return (
    <>
      <SideBarItem
        text={props.main.text}
        icon={props.main.icon}
        onClick={() => setOpen(!open)}
        stayOpenOnClick
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            background: '#0000000d',
          }}
        >
          {props.children}
        </List>
      </Collapse>
    </>
  );
}

function SideBarLanguageButton() {
  const [open, setOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
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
              secondary={Language.getTranslation(el.code)}
              key={i}
              secondaryTypographyProps={{ color: theme.palette.text.primary }}
              onClick={() => {
                setLanguage(el.code);
                toggleSidebar();
              }}
            />
          </ListItemButton>
        );
      })}
    </SideBarCollapseItem>
  );
}
