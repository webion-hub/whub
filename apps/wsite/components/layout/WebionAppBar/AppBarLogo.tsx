import { NextImg } from "@webion/ui-components";
import { useNextNavigator } from "@webion/ui-core";
import { useLayout } from "@webion/ui-layout";
import { AppBarLogo as WuiAppBarLogo } from "@webion/ui-layout/AppBar";

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
        skeletonVariant="circular"
        src="/assets/images/webion-logo.png"
        width={42}
        height={42}
        alt="logo"
      />
    </WuiAppBarLogo>
  )
}
