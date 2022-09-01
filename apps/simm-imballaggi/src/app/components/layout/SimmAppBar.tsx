import React, { useEffect, useState } from "react";

import { CategorySearchBar, AppBar, AppBarContent, AppBarSection, AppBarLogo, Responser, useNavigator, useGlobalDialogs, MaybeShow } from "@whub/wui";
import { Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { AddBoxRounded, LoginRounded, LogoutRounded, PersonRounded, TableRowsRounded } from "@mui/icons-material";
import CallRounded from "@mui/icons-material/CallRounded";
import { ProductListItem } from "@whub/wshop-ui";
import _, { cond } from "lodash"
import { Category, Product } from "@whub/wshop-api";
import { useAuth, useShopApi } from "@whub/apis-react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  const { openDialog } = useGlobalDialogs()
  const { clickNavigate } = useNavigator()
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
            <AuthBtn/>
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


export function ProductSearchBar() {
  const { clickNavigate, navigate } = useNavigator()
  const shopApi = useShopApi()
  const allCategory = 'Tutte'
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const getCategory = () => {
    return category === allCategory
      ? ''
      : category
  }

  const fetchProducts = (filter: string) => {
    setValue(filter)
    setLoading(true)

    shopApi.products
      .search
      .filter({
        query: filter,
        category: getCategory(),
        skip: 0,
        take: 20,
      })
      .then(res => setProducts(res.data.results))
      .finally(() => setLoading(false))
  }

  const fetchCategories = () => {
    setLoading(true)

    shopApi.categories
      .list()
      .then(res => setCategories(prepareCategories(res.data)))
      .finally(() => setLoading(false))
  }

  const prepareCategories = (categories: Category[]) => {
    return _(categories)
      .map(c => c.name.split('/')?.[0])
      .uniq()
      .value()
  }

  return (
    <CategorySearchBar
      defaultCategory={allCategory}
      onSearch={() => navigate(`products?filter=${value}&category=${getCategory()}`)}
      getCategoryOptionLabel={option => option}
      getCategoryValue={option => option}
      categories={[...categories, allCategory]}
      onCategoryChange={setCategory}
      onValueChange={fetchProducts}
      onOpen={() => fetchProducts('')}
      options={products}
      loading={loading}
      groupBy={option => option.category?.name ?? 'Altro'}
      getOptionLabel={option =>
        typeof option === 'string' || option instanceof String
          ? option as string
          : option.name
      }
    >
      {
        (props, option) =>
          <ProductListItem
            key={_.uniqueId()}
            listItemProps={{
              ...props,
              onClick: (e: Event) => e.preventDefault()
            }}
            product={option}
          >
            <Button
              onClick={clickNavigate(`/product/${option.id}`)}
            >
              Vedi
            </Button>
          </ProductListItem>
      }
    </CategorySearchBar>
  )
}


function AuthBtn() {
  const { clickNavigate, navigate } = useNavigator()
  const { isLogged, isAdmin, user, logOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToTable = () => {
    navigate('/products-table')
    handleClose()
  }

  const goToAddProduct = () => {
    navigate('/add-product')
    handleClose()
  }

  const onLogout = () => {
    setLoading(true)
    logOut({
      onComplete: () => {
        handleClose()
        navigate('')
        setLoading(false)
      }
    })
  }

  if(!isLogged)
    return (
      <IconButton
        color="primary"
        href="/login"
        onClick={clickNavigate('/login')}
      >
        <LoginRounded/>
      </IconButton>
    )

  return (
    <>
      <LoadingButton
        loading={loading}
        startIcon={<PersonRounded/>}
        onClick={handleClick}
      >
        {user?.userName}
      </LoadingButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MaybeShow  show={isAdmin}>
          <MenuItem onClick={goToTable}>
            <ListItemIcon> <TableRowsRounded/> </ListItemIcon>
            <ListItemText> Tabella prodotti </ListItemText>
          </MenuItem>
          <MenuItem onClick={goToAddProduct}>
            <ListItemIcon> <AddBoxRounded/> </ListItemIcon>
            <ListItemText> Aggiungi prodotto </ListItemText>
          </MenuItem>
        </MaybeShow>
        <MenuItem onClick={onLogout}>
          <ListItemIcon> <LogoutRounded/> </ListItemIcon>
          <ListItemText> Logout </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
