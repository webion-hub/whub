import { KeyboardArrowDownRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Chip,
  FormGroup,
  IconButton,
  InputBase,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Box, Stack, SxProps, Theme } from '@mui/system';
import { Page, PageSettings, Section, Sections, useLanguage } from '@whub/wui';
import _ from 'lodash';
import { useState } from 'react';
import BlogArticleCard, {
  BlogArticle,
  Categories,
} from '../../components/cards/BlogArticleCard';
import CategoryButton from '../../components/CategoryButton';
import { articles } from './articles';

type SelectedCategories = {
  readonly [key in Categories]: boolean;
};

export default function Blog() {
  // const orderByValues = ['most-recent', 'alphabetic', 'reverse-alphabetic', 'reading-time']

  const [categories, setCategories] = useState<SelectedCategories>({
    business: false,
    coding: false,
    design: false,
    other: false,
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

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const categories = ['Business', 'Coding', 'Design', 'Other'];

  const filterArticle = (art: BlogArticle) => {
    const areAllCategoriesUnselected = Object.values(categories).every(
      (el) => !el
    );
    const isCategorySelected = categories[art.category];
    const isTitleSameAsSearched = art.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const isSearchEmpty = art.title.toLowerCase() === '';

    return (
      (areAllCategoriesUnselected || isCategorySelected) &&
      (isTitleSameAsSearched || isSearchEmpty)
    );
  };
  const filteredArticles = _(articles)
    .filter(filterArticle)
    .sortBy((art1) => {
      return !art1.id;
    })
    .value();

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
            {/* <Typography variant="h2" component="h1" textAlign="center">
              {t('blog-title')}
            </Typography> */}
            {/* <Chip
              sx={{
                textTransform: 'capitalize',
              }}
              size="medium"
              color="primary"
              label={t('blog-title')}
            /> */}
            <Typography
              variant="h3"
              component="h1"
              color="text"
              sx={{
                maxWidth: '100%',
                textAlign: 'center',
                marginBottom: 6,
                // background:
                //   'linear-gradient(to right, #ffffffd9 20%, #8d98f3db 100%)',
                // WebkitBackgroundClip: 'text',
                // WebkitTextFillColor: 'transparent',
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gridGap: 8,
                  }}
                >
                  <CategoryButton
                    category="business"
                    text={t('business')}
                    selected={categories['business']}
                    onChange={() => toggleCategory('business')}
                  />
                  <CategoryButton
                    category="coding"
                    text={t('coding')}
                    selected={categories['coding']}
                    onChange={() => toggleCategory('coding')}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    flexGrow: 1,
                    maxWidth: '100%',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gridGap: 8,
                  }}
                >
                  <CategoryButton
                    category="design"
                    text={t('design')}
                    selected={categories['design']}
                    onChange={() => toggleCategory('design')}
                  />
                  <CategoryButton
                    category="other"
                    text={t('other')}
                    selected={categories['other']}
                    onChange={() => toggleCategory('other')}
                  />
                </Box>
              </Box>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  marginTop: 2,
                  flexGrow: 1,
                  alignItems: 'center',
                  minxWidth: 300,
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
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                  marginBlock: 2,
                }}
              >
                <Box>
                  {/* <Button
                    color="inherit"
                    size="large"
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownRounded />}
                    sx={{
                      textTransform: 'initial',
                      '& .MuiButton-endIcon': {
                        transition: '0.25s transform',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      },
                    }}
                  >
                    {t('order-by')}
                  </Button> */}
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
                width: 'clamp(300px, 95%, 1000px)',
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
  );
}
