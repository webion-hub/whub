import { Typography, useMediaQuery } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import { blogFactory } from '@webion/api-ui-blog';
import { BlogArticle } from '@webion/api-blog';
import { useDidUpdateEffect } from '@webion/ui-core';
import Page from '@webion/ui-layout/Page';
import PageSettings from '@webion/ui-layout/PageSettings';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import axios from 'axios';
import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';
import useSWR from 'swr';
import { ArticleFilters, ArticlesFilterBox } from '../../components/blog/ArticlesFilterBox';
import BlogArticleCard from '../../components/blog/BlogArticleCard';

export default function Blog({ fallback }: any) {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Page>
      <PageSettings pageTranslationName="blog" />
      <Sections>
        <Section
          sx={{ paddingInline: 2 }}
        >
          <Typography
            variant={isMd ? "h4" : "h3"}
            component="h1"
            color="text"
            sx={{
              marginTop: 4,
              maxWidth: '100%',
              textAlign: 'center',
            }}
          >
            {t('blog-description')}
          </Typography>
        </Section>
        <BlogArticleList/>
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
        margin: 1,
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
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const cancelToken = useRef(axios.CancelToken.source())
  const filters = useRef<ArticleFilters>({
    categories: [],
    searchValue: ''
  })

  const endpoint = blogFactory().articles.forLanguage(locale ?? 'it')

  const { data, mutate } = useSWR(endpoint.url, async () => {
    setLoading(true)
    const res = await endpoint
      .filter({
        categories: filters.current.categories as any[],
        query: filters.current.searchValue
      }, cancelToken.current.token)

    setLoading(false)
    return res.data
  })

  useDidUpdateEffect(() => {
    fetchArticles(filters.current)
  }, [locale])

  const articles = data ?? []

  const fetchArticles = async (f: ArticleFilters) => {
    filters.current = f

    cancelToken.current.cancel()
    cancelToken.current = axios.CancelToken.source()

    await mutate()
  }

  return (
    <>
      <Section
        sx={{
          padding: 1,
          position: { xs: 'relative', sm: 'sticky'},
          zIndex: 2,
          background: theme => theme.palette.background.default,
          top: theme => ({ xs: 'inherit', sm: theme.mixins.toolbar.height }),
        }}
      >
        <ArticlesFilterBox
          loading={loading}
          articles={articles}
          onFiltersChange={fetchArticles}
        />
      </Section>
      <Section sx={{ paddingTop: 1.25 }}>
        <ArticleList 
          articles={articles}
        />
      </Section>
    </>
  )
}

