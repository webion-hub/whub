import React from "react";

import { AddBoxRounded, TableRowsRounded } from "@mui/icons-material";
import CallRounded from "@mui/icons-material/CallRounded";
import { IconButton, ListItemIcon, ListItemText, MenuItem, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { AuthBtn, UserUtils } from "@whub/apis-react";
import { ProductSearchBar, ShopRoutes } from "@whub/wshop-ui";
import { AppBar, AppBarContent, AppBarLogo, AppBarSection, MaybeShow, NextImg, Responser, useGlobalDialogs, useNextNavigator } from "@whub/wui";

// eslint-disable-next-line react/display-name
const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  const { openDialog } = useGlobalDialogs()
  const { clickNavigate, navigate } = useNextNavigator()

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const getWindow = () => {
    if (typeof window === "undefined")
      return

    return window
  }

  const trigger = useScrollTrigger({
    target: getWindow(),
  });

  const goToTable = (onClose: () => void) => {
    navigate(ShopRoutes.PRODUCTS_TABLE)
    onClose()
  }

  const goToAddProduct = (onClose: () => void) => {
    navigate(ShopRoutes.PRODUCT_ADD)
    onClose()
  }

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
              href="/"
              onClick={clickNavigate('/')}
              sx={{ padding: 1 }}
            >
              <NextImg
                src="/assets/images/logo.webp"
                width={42}
                height={42}
                alt="logo"
              />
            </AppBarLogo>
          </AppBarSection>
          <AppBarSection
            alignment="center"
            hideOnMobile
            fullWidth
          >
            <ProductSearchBar/>
          </AppBarSection>
          <AppBarSection alignment="end">
            <IconButton
              color="primary"
              onClick={() => openDialog('contacts')}
            >
              <CallRounded/>
            </IconButton>
            <AuthBtn>
              {
                (onClose, user) =>
                  <MaybeShow
                    show={UserUtils.hasRole('admin', user)}
                  >
                    <MenuItem onClick={() => goToTable(onClose)}>
                      <ListItemIcon> <TableRowsRounded/> </ListItemIcon>
                      <ListItemText> Tabella prodotti </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => goToAddProduct(onClose)}>
                      <ListItemIcon> <AddBoxRounded/> </ListItemIcon>
                      <ListItemText> Aggiungi prodotto </ListItemText>
                    </MenuItem>
                  </MaybeShow>
              }
            </AuthBtn>
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
            <AppBarSection
              fullWidth
              alignment="center"
            >
              <ProductSearchBar/>
            </AppBarSection>
          </AppBarContent>
        </AppBar>
      </Responser>
    </>
  )
});

export default SimmAppbar
