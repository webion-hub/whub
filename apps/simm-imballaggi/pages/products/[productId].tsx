import { AppContext } from '@whub/apis-react';
import { ProductVisualizer } from '@whub/wshop-ui';
import { Page, Section, useLayout } from '@whub/wui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import {
  SimmLayoutWithCategories,
  useProductLayout,
} from '../../components/layout/SimmLayoutWithCategories';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const productId = parseInt(params.productId);
  const endpoint = AppContext.shopApi.products.withId(productId);
  const res = await endpoint.load();

  return {
    props: {
      productId,
      fallback: {
        [endpoint.url]: res.data,
      },
    },
  };
}

export default function ProductPage({ fallback, productId }) {
  const router = useRouter();
  const { setLoading } = useLayout();
  const { setCategory } = useProductLayout();

  useEffect(() => {
    setLoading(router.isFallback);
  }, [router.isFallback]);

  if (!productId) return null;

  return (
    <SWRConfig value={{ fallback, revalidateIfStale: false }}>
      <Page>
        <Section sx={{ padding: 0 }}>
          <ProductVisualizer
            productId={parseInt(productId)}
            onProductFetch={(p) => setCategory(p?.category.name ?? '')}
          />
        </Section>
      </Page>
    </SWRConfig>
  );
}

ProductPage.Layout = SimmLayoutWithCategories;
