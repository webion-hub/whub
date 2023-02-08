import CloseRounded from '@mui/icons-material/CloseRounded';
import ComputerRounded from '@mui/icons-material/ComputerRounded';
import DevicesRounded from '@mui/icons-material/DevicesRounded';
import FactoryRounded from '@mui/icons-material/FactoryRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';

import { Box, IconButton } from '@mui/material';
import { BasicThemeButton } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import { useLayout } from '@wui/layout';
import { SideBar, SideBarItem } from '@wui/layout/Sidebar';
import useLanguage from '@wui/wrappers/useLanguage';
import { SideBarCollapseItem } from './SideBarCollapseItem';
import { SideBarLanguageButton } from './SideBarLanguageButton';
import { BookRounded, WorkRounded } from '@mui/icons-material';

export default function WebionSideBar() {
  const { t } = useLanguage();
  const { toggleSideBar } = useLayout();
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
      text: t('navbar-button5'),
      icon: ComputerRounded,
      href: '/techs',
    },
    {
      text: t('navbar-button4'),
      icon: GroupsRounded,
      href: '/who-we-are',
    },
    {
      text: t('navbar-button6'),
      icon: BookRounded,
      href: '/blog',
    },
    {
      text: t('navbar-button7'),
      icon: WorkRounded,
      href: '/work-with-us',
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
        <IconButton onClick={toggleSideBar}>
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
          icon={<PhoneIphoneRounded />}
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
