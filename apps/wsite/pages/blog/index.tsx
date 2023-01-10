import SearchIcon from '@mui/icons-material/Search';
import {
  FormGroup,
  IconButton,
  InputBase,
  LinearProgress,
  Link, Paper,
  Typography
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { AppContext, useBlog } from '@whub/apis-react';
import { BlogArticle, BlogCategories } from '@whub/apis/blog';
import { Page, PageSettings, Section, Sections, useLanguage } from '@whub/wui';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import BlogArticleCard from '../../components/cards/BlogArticleCard';
import CategoryButton from '../../components/CategoryButton';
import useSWR, { SWRConfig } from 'swr';

export async function getServerSideProps({ locale }) {
  const endpoint = AppContext.blogApi.articles.forLanguage(locale);
  const res = await endpoint.filter();

  return {
    props: {
      fallback: {
        [endpoint.url]: res.data,
      },
    },
  };
}

export default function Blog({ fallback }) {
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

function BlogArticleList() {
  const { locale } = useRouter()
  const { t } = useLanguage();

  const [categories, setCategories] = useState<BlogCategories[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const endpoint = AppContext.blogApi.articles.forLanguage(locale);
  const { data, isValidating, mutate } = useSWR(endpoint.url, async () => {
    const res = await endpoint.filter({
      categories: categories,
      query: searchValue
    })

    return  res.data
  })

  const loading = isValidating
  const articles = data ?? []

  useEffect(() => {
    mutate()
  }, [categories, searchValue])

  const clearAll = () => {
    setSearchValue('');
    setCategories([]);
  };

  const isCategoryPresent = (category: BlogCategories) => {
    return !!categories.find(c => c === category)
  }

  const toggleCategory = (category: BlogCategories) => {
    const isPresent = isCategoryPresent(category)

    const newCategories = isPresent
      ? categories.filter(c => c !== category)
      : categories.concat(category)

    setCategories(newCategories);
  };

  return (
    <Section
      sx={{
        padding: 1,
        position: { xs: 'relative', md: 'sticky'},
        zIndex: 2,
        background: theme => theme.palette.background.default,
        top: theme => theme.mixins.toolbar.height,
      }}
    >
      <FormGroup
        sx={{
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('showing-1')} {articles.length} {t('showing-2')}{' '}
            {articles.length}
          </Typography>
          <Link
            component="button"
            variant="body2"
            color="text.primary"
            onClick={() => clearAll()}
            sx={{
              textTransform: 'inherit',
              textDecoration: 'none',
              fontWeight: 400,
            }}
          >
            {t('clear')}
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '1000px',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gridGap: 8,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              flexGrow: 1,
              maxWidth: '100%',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gridGap: 8,
            }}
          >
            <CategoryButton
              category="business"
              text={t('business')}
              selected={isCategoryPresent('Business')}
              onChange={() => toggleCategory('Business')}
            />
            <CategoryButton
              category="coding"
              text={t('coding')}
              selected={isCategoryPresent('Coding')}
              onChange={() => toggleCategory('Coding')}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              flexGrow: 1,
              maxWidth: '100%',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gridGap: 8,
            }}
          >
            <CategoryButton
              category="design"
              text={t('design')}
              selected={isCategoryPresent('Design')}
              onChange={() => toggleCategory('Design')}
            />
            <CategoryButton
              category="other"
              text={t('other')}
              selected={isCategoryPresent('Other')}
              onChange={() => toggleCategory('Other')}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              flexGrow: 1,
              maxWidth: '100%',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gridGap: 8,
            }}
          >
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                flexGrow: 1,
                alignItems: 'center',
                minWidth: 150,
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t('search-article')}
                inputProps={{ 'aria-label': t('search-article') }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Paper>
          </Box>
        </Box>
        <Box
          sx={{
            visibility: loading
              ? 'visible'
              : 'hidden'
          }}
        >
          <LinearProgress/>
        </Box>
      </FormGroup>
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
    </Section>
  )
}
