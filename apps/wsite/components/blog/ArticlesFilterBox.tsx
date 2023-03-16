import SearchRounded from "@mui/icons-material/SearchRounded";
import { Box, FormGroup, IconButton, InputBase, LinearProgress, Link, Paper, Typography } from "@mui/material";
import { BlogArticle, BlogCategories } from "@wapi/blog";
import useLanguage from "@wui/wrappers/useLanguage";
import { ChangeEvent, useEffect, useState } from "react";
import BlogCategoryButton from "./BlogCategoryButton";

export interface ArticleFilters {
  readonly categories: string[],
  readonly searchValue: string
}

interface ArticlesFilterBoxProps {
  readonly articles: BlogArticle[],
  readonly loading: boolean,
  readonly onFiltersChange: (value: ArticleFilters) => void
}

export function ArticlesFilterBox(props: ArticlesFilterBoxProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<ArticleFilters>({
    categories: [],
    searchValue: ''
  })

  useEffect(() => {
    props.onFiltersChange(filters)
  }, [filters])
  
  const clearAll = () => {
    setFilters({
      categories: [],
      searchValue: ''
    });
  };

  const isCategoryPresent = (category: BlogCategories) => {
    return !!filters.categories.find(c => c === category)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchValue: e.target.value
    })
  }

  const toggleCategory = (category: BlogCategories) => {
    const isPresent = isCategoryPresent(category)

    const newCategories = isPresent
      ? filters.categories.filter(c => c !== category)
      : filters.categories.concat(category)

    setFilters({
      ...filters,
      categories: newCategories
    });
  };

  return (
    <FormGroup
      onSubmit={e => e.preventDefault()}
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
          {t('showing-1')} {props.articles.length} {t('showing-2')}{' '}
          {props.articles.length}
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
          <BlogCategoryButton
            category="business"
            text={t('business')}
            selected={isCategoryPresent('Business')}
            onChange={() => toggleCategory('Business')}
          />
          <BlogCategoryButton
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
          <BlogCategoryButton
            category="design"
            text={t('design')}
            selected={isCategoryPresent('Design')}
            onChange={() => toggleCategory('Design')}
          />
          <BlogCategoryButton
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
              <SearchRounded />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('search-article')}
              inputProps={{ 'aria-label': t('search-article') }}
              value={filters.searchValue}
              onChange={handleSearch}
            />
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          visibility: props.loading
            ? 'visible'
            : 'hidden'
        }}
      >
        <LinearProgress/>
      </Box>
    </FormGroup>
  )
}