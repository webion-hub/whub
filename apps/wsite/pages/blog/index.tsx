import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { blogFactory } from '@wapi-ui/blog';
import { BlogArticle } from '@wapi/blog';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import useSWR, { SWRConfig } from 'swr';
import { ArticleFilters, ArticlesFilterBox } from '../../components/blog/ArticlesFilterBox';
import BlogArticleCard from '../../components/blog/BlogArticleCard';

export async function getServerSideProps({ locale }: any) {
  const endpoint = blogFactory().articles.forLanguage(locale);
  const res = await endpoint.filter();

  return {
    props: {
      fallback: {
        [endpoint.url]: res.data,
      },
    },
  };
}

export default function Blog({ fallback }: any) {
  const { t } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="blog" />
      <Sections>
        <Section
          sx={{
            paddingInline: 2,
            paddingBottom: 1,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            color="text"
            sx={{
              paddingTop: 8,
              maxWidth: '100%',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            {t('blog-description')}
          </Typography>
        </Section>
        <SWRConfig value={{ fallback, revalidateIfStale: false }}>
          <BlogArticleList/>
        </SWRConfig>
      </Sections>
    </Page>
  );
}


const ArticleList = memo(({ articles }: { articles: BlogArticle[] }) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        width: '100%',
        margin: 2,
        '& > *': {
          width: 'clamp(200px, 100%, 1000px)',
        },
      }}
    >
      {articles.map((article, i) => {
        return <BlogArticleCard key={i} article={article} />;
      })}
    </Stack>
  )
})

ArticleList.displayName = 'ArticleList'

function BlogArticleList() {
  const { locale } = useRouter()
  const cancelToken = useRef(axios.CancelToken.source())
  const filters = useRef<ArticleFilters>({
    categories: [],
    searchValue: ''
  })

  const endpoint = blogFactory().articles.forLanguage(locale ?? 'it')

  const { data, isValidating, mutate } = useSWR(endpoint.url, async () => {
    const res = await endpoint
      .filter({
        categories: filters.current.categories as any[],
        query: filters.current.searchValue
      }, cancelToken.current.token)

    return res.data
  })

  const loading = isValidating
  const articles = data ?? []

  const fetchArticles = (f: ArticleFilters) => {
    filters.current = f

    cancelToken.current.cancel()
    cancelToken.current = axios.CancelToken.source()
    mutate()
  }

  return (
    <>
      <Section
        sx={{
          padding: 1,
          position: { xs: 'relative', md: 'sticky'},
          zIndex: 2,
          background: theme => theme.palette.background.default,
          top: theme => theme.mixins.toolbar.height,
        }}
      >
        <ArticlesFilterBox
          loading={loading}
          articles={articles}
          onFiltersChange={fetchArticles}
        />
      </Section>
      <Section sx={{ paddingTop: 0 }}>
        <ArticleList 
          articles={articles}
        />
      </Section>
    </>
  )
}
