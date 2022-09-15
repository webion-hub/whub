import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useNavigator } from "@whub/wui";
import { useTranslation } from "react-i18next";
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";

export function ProductCategoryOutput(props: GeneralProductOutputProps) {
  return (
    <ProductOutput
      name="category"
      {...props}
    >
      {
        category =>
          <ProductCategory
            categoryName={category?.name}
          />
      }
    </ProductOutput>
  )
}

interface ProductCategoryProps {
  readonly categoryName?: string
}

export function ProductCategory(props: ProductCategoryProps) {
  const { t } = useTranslation()
  const { clickNavigate } = useNavigator()

  const getUrl = (category: string[], index: number) => {
    const categoryUrl =  category
      .slice(0, index + 1)
      .join('/')

    return `/products?filter=&category=${categoryUrl}`
  }

  if(!props.categoryName)
    return null

  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {t('category')}
      </Typography>
      <Breadcrumbs sx={{ width: '100%' }}>
        {
          (props.categoryName ?? '')
            .split('/')
            .map((v, i, all) => {
              const isLast = i === all.length - 1

              return (
                <Link
                  key={i}
                  underline="hover"
                  color={isLast ? 'text.primary' : "inherit"}
                  href={getUrl(all, i)}
                  onClick={clickNavigate(getUrl(all, i))}
                >
                  {v}
                </Link>
              )
            })
        }
      </Breadcrumbs>
    </Stack>
  )
}
