import { Button } from "@mui/material";
import { useShop } from "@whub/apis-react";
import { Category, Product } from "@whub/wshop-api";
import { CategorySearchBar, useNavigator, useSubject } from "@whub/wui";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { throttleTime } from "rxjs";
import { ShopRoutes } from "../lib/ShopRoutes";
import { ProductListItem } from "./ProductListItem";

export function ProductSearchBar() {
  const { clickNavigate, navigate } = useNavigator()
  const searchSubject$ = useSubject<string>('')
  const shopApi = useShop().api
  const { t } = useTranslation()
  const allCategory = t('all')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()

    const sub = searchSubject$
      .pipe(throttleTime(10))
      .subscribe(val => setValue(val))

    return () => sub.unsubscribe()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [value])

  const getCategory = () => {
    return category === allCategory
      ? ''
      : category
  }

  const fetchProducts = () => {
    setLoading(true)

    shopApi.products
      .search
      .filter({
        query: value,
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
      label={t('search-product')}
      onSearch={() => navigate(ShopRoutes.products({ category: getCategory(), filter: value }))}
      getCategoryOptionLabel={option => option}
      getCategoryValue={option => option}
      categories={[...categories, allCategory]}
      onCategoryChange={setCategory}
      onValueChange={value => searchSubject$.next(value)}
      onOpen={() => fetchProducts()}
      options={_(products).sortBy(p => p.category?.name).value()}
      loading={loading}
      groupBy={option => option.category?.name ?? t('other')}
      getOptionLabel={option =>
        typeof option === 'string' || option instanceof String
          ? option as string
          : option.name
      }
    >
      {
        (props, option, onClose) =>
          <ProductListItem
            key={option.id}
            listItemProps={{
              ...props,
              onClick: (e: Event) => e.preventDefault()
            }}
            product={option}
            onClick={() => {
              navigate(ShopRoutes.getProductRoute(option.id))
              onClose()
            }}
          >
            <Button
              onClick={e => {
                clickNavigate(ShopRoutes.getProductRoute(option.id))(e)
                onClose()
              }}
            >
              {t('see')}
            </Button>
          </ProductListItem>
      }
    </CategorySearchBar>
  )
}
