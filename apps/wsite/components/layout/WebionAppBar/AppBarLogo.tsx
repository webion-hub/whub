import { NextImg } from "@wui/components";
import { useNextNavigator } from "@wui/core";
import { useLayout } from "@wui/layout";
import { AppBarLogo as WuiAppBarLogo } from "@wui/layout/AppBar";

export function AppBarLogo() {
  const { currentSection } = useLayout();
  const { clickNavigate } = useNextNavigator();
  const isHome = currentSection === 'home';

  return (
    <WuiAppBarLogo
      label="Webion"
      href="/#home"
      onClick={clickNavigate('/#home')}
      sx={{ padding: 1 }}
      buttonSx={{
        '& > *': {
          color: (theme) =>
            isHome ? '#fff !important' : theme.palette.text.primary,
        },
      }}
    >
      <NextImg
        skeletonvariant="circular"
        src="/assets/images/webion-logo.png"
        width={42}
        height={42}
        alt="logo"
      />
    </WuiAppBarLogo>
  )
}
