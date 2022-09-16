import React from "react";

import CallRounded from "@mui/icons-material/CallRounded";
import { IconButton, ListItemIcon, ListItemText, MenuItem, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { AppBar, AppBarContent, AppBarLogo, AppBarSection, MaybeShow, Responser, useGlobalDialogs, useNavigator } from "@whub/wui";
import { ProductSearchBar, ShopRoutes } from "@whub/wshop-ui";
import { AuthBtn, UserUtils } from "@whub/apis-react";
import { AddBoxRounded, TableRowsRounded } from "@mui/icons-material";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  const { openDialog } = useGlobalDialogs()
  const { clickNavigate, navigate } = useNavigator()

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const trigger = useScrollTrigger({
    target: window ? window : undefined,
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
              src="assets/images/logo.webp"
              href='/'
              onClick={clickNavigate('/')}
            />
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
