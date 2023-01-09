import SearchIcon from '@mui/icons-material/Search';
import {
  FormGroup,
  IconButton,
  InputBase,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';
import { Box, Stack, SxProps, Theme } from '@mui/system';
import { AppContext } from '@whub/apis-react';
import { BlogCategories } from '@whub/apis/blog';
import { Page, PageSettings, Section, Sections, useLanguage } from '@whub/wui';
import { useEffect, useState } from 'react';
import BlogArticleCard from '../../components/cards/BlogArticleCard';
import CategoryButton from '../../components/CategoryButton';

type SelectedCategories = {
  readonly [key in BlogCategories]: boolean;
};

export async function getServerSideProps({ locale }) {
  const endpoint = AppContext.blogApi.articles.forLanguage(locale);
  const res = await endpoint.list();

  return {
    props: {
      fallback: {
        [endpoint.url]: res.data,
      },
    },
  };
}


export default function Blog({ fallback }) {
  const [categories, setCategories] = useState<SelectedCategories>({
    Business: false,
    Coding: false,
    Design: false,
    Other: false,
  });

  const [searchValue, setSearchValue] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useLanguage();

  const listItemSx: SxProps<Theme> = {
    paddingLeft: (theme) => theme.spacing(0, '!important'),
    paddingRight: (theme) => theme.spacing(4, '!important'),
    marginBlock: 1,
  };

  const clearCategories = () => {
    const keys = Object.keys(categories);
    const entries = keys.map((k) => [k, false]);
    setCategories(Object.fromEntries(entries));
  };
  const clearSearch = () => {
    setSearchValue('');
  };

  const clearAll = () => {
    clearSearch();
    clearCategories();
  };

  const toggleCategory = (key: keyof SelectedCategories) => {
    setCategories((categories) => ({
      ...categories,
      [key]: !categories[key],
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div>ciao</div>

  /*
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
          <Stack
            direction="column"
            spacing={4}
            alignItems="center"
            maxWidth={1000}
            width="100%"
            sx={{ paddingTop: 8, maxWidth: 1000 }}
          >
            <Typography
              variant="h3"
              component="h1"
              color="text"
              sx={{
                maxWidth: '100%',
                textAlign: 'center',
                marginBottom: 6,
              }}
            >
              {t('blog-description')}
            </Typography>
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
                  {t('showing-1')} {filteredArticles.length} {t('showing-2')}{' '}
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
                    selected={categories['business']}
                    onChange={() => toggleCategory('Business')}
                  />
                  <CategoryButton
                    category="coding"
                    text={t('coding')}
                    selected={categories['coding']}
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
                    selected={categories['design']}
                    onChange={() => toggleCategory('Design')}
                  />
                  <CategoryButton
                    category="other"
                    text={t('other')}
                    selected={categories['other']}
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

              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                  marginBlock: 2,
                }}
              >
                <Box>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem sx={listItemSx} selected={false}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={t('most-recent')} />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={t('alphabetic')} />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={t('reverse-alphabetic')} />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={t('reading-time')} />
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </FormGroup>
          </Stack>
        </Section>
        <Section sx={{ paddingTop: 0, paddingInline: 2 }}>
          <Stack
            direction="column"
            alignItems="center"
            spacing={4.5}
            sx={{
              width: '100%',
              margin: 2,
              '& > *': {
                width: 'clamp(200px, 100%, 1000px)',
              },
            }}
          >
            {filteredArticles.map((article, i) => {
              return <BlogArticleCard key={i} article={article} />;
            })}
          </Stack>
        </Section>
      </Sections>
    </Page>
  );*/
}
