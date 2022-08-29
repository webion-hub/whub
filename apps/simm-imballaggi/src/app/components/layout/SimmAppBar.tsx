import React, { useEffect, useState } from "react";

import { CategorySearchBar, AppBar, AppBarContent, AppBarSection, AppBarLogo, Responser, useNavigator } from "@whub/wui";
import { Button, IconButton, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
import CallRounded from "@mui/icons-material/CallRounded";
import { ProductListItem } from "@whub/wshop-ui";
import _, { cond } from "lodash"
import { Category, Product } from "@whub/wshop-api";
import { useShopApi } from "@whub/apis-react";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
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
            <IconButton color="primary">
              <CallRounded/>
            </IconButton>
            <IconButton
              color="primary"
              href="/login"
              onClick={clickNavigate('/login')}
            >
              <LoginRounded/>
            </IconButton>
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
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchProducts = (filter: string) => {
    setValue(filter)
    setLoading(true)

    shopApi.products
      .search
      .filter({
        query: filter,
        category: category,
        skip: 0,
        take: 20,
      })
      .then(res => setProducts(res.data))
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
      onSearch={() => navigate(`products/${category}/${value}`)}
      getCategoryOptionLabel={option => option}
      getCategoryValue={option => option}
      categories={categories}
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
