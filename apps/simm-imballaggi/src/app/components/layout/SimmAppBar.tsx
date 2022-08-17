import React from "react";

import { CategorySearchBar, AppBar, AppBarContent, AppBarSection, AppBarLogo, SideBarButton, Responser, useNavigator } from "@whub/wui";
import { IconButton, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
import CallRounded from "@mui/icons-material/CallRounded";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const navigate = useNavigator()
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
  });


  return (
    <>
      <AppBar
        ref={ref}
        sx={{
          transition: '0.25s transform',
          transform: trigger && isMobileView
            ? `translateY(${- (theme.mixins.toolbar.height ?? 0)}px)`
            : 'translateY(0)'
        }}
      >
        <AppBarContent
          centerWidth={{
            mobile: 'calc(100% - 200px)',
            default: '60%'
          }}
        >
          <AppBarSection alignment="start">
            <AppBarLogo
              src="assets/images/logo.png"
              href='/'
              onClick={navigate('/')}
            />
          </AppBarSection>
          <AppBarSection alignment="center" hideOnMobile>
            <CategorySearchBar filter="" elements={[]}/>
          </AppBarSection>
          <AppBarSection alignment="end">
            <IconButton color="primary">
              <CallRounded/>
            </IconButton>
            <IconButton
              color="primary"
              href="/login"
              onClick={navigate('/login')}
            >
              <LoginRounded/>
            </IconButton>
            <SideBarButton/>
          </AppBarSection>
        </AppBarContent>
      </AppBar>
      <Responser
        type="lower"
        size="md"
      >
        <AppBar
          sx={{
            transition: '0.25s transform',
            transform: trigger && isMobileView
              ? 'translateY(0)'
              : `translateY(${theme.mixins.toolbar.height}px)`
          }}
        >
          <AppBarContent>
            <AppBarSection alignment="center">
              <CategorySearchBar filter="" elements={[]}/>
            </AppBarSection>
          </AppBarContent>
        </AppBar>
      </Responser>
    </>
  )
});

export default SimmAppbar
