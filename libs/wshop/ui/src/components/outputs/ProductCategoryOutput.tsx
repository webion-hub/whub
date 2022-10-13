import { Breadcrumbs, Link } from '@mui/material';
import { useLanguage, useNextNavigator } from '@whub/wui';

import { ShopRoutes } from '../../lib/ShopRoutes';
import { GeneralProductOutputProps, ProductOutput } from '../ProductOutput';

export function ProductCategoryOutput(props: GeneralProductOutputProps) {
  return (
    <ProductOutput name="category" {...props}>
      {(category) => <ProductCategory categoryName={category?.name} />}
    </ProductOutput>
  );
}

interface ProductCategoryProps {
  readonly categoryName?: string;
}

export function ProductCategory(props: ProductCategoryProps) {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  const getUrl = (category: string[], index: number) => {
    const categoryUrl = category.slice(0, index + 1).join('/');

    return ShopRoutes.products({ category: categoryUrl });
  };

  return (
    <Breadcrumbs
      sx={{
        width: '100%',
        minHeight: 24
      }}
    >
      {(props.categoryName ?? '').split('/').map((v, i, all) => {
        const isLast = i === all.length - 1;

        return (
          <Link
            key={i}
            underline="hover"
            color={isLast ? 'text.primary' : 'inherit'}
            href={getUrl(all, i)}
            onClick={clickNavigate(getUrl(all, i))}
          >
            {v}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
