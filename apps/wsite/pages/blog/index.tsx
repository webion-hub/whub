import { KeyboardArrowDownRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  FormGroup,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Box, Stack, SxProps, Theme } from '@mui/system';
import { MaybeShow, Page, Section, Sections, useLanguage } from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import { useState } from 'react';
import useSWR from 'swr';
import BlogArticleCard, {
  BlogArticle,
} from '../../components/cards/BlogArticleCard';
import CategoryButton from '../../components/CategoryButton';

const jsonFetcher = (path: string) =>
  fetch(path).then((response) => response.json());

export default function Blog() {
  const { data, error, isValidating } = useSWR<BlogArticle[]>(
    'pages/api/articles',
    jsonFetcher
  );

  const { t } = useLanguage();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const listItemSx: SxProps<Theme> = {
    paddingLeft: (theme) => theme.spacing(0, '!important'),
    paddingRight: (theme) => theme.spacing(4, '!important'),
    marginBlock: 1,
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const categories = ['Business', 'Coding', 'Design', 'Other'];

  return (
    <Page>
      <PageSettings pageTranslationName="blog" />
      <Sections>
        <Section sx={{ paddingBottom: 0, maxWidth: 1200, paddingInline: 10 }}>
          <Stack
            direction="column"
            spacing={4}
            alignItems="center"
            maxWidth={1000}
            width={1000}
            sx={{ paddingTop: 10 }}
          >
            <Typography variant="h2" component="h1" textAlign="center">
              The Webion blog
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              color="info.contrastText"
              sx={{ maxWidth: 650, textAlign: 'center', marginBottom: 20 }}
            >
              Exploring the Intersection of Computer Science, Business, Design,
              and Technology
            </Typography>
            <FormGroup>
              <Stack
                direction={{ sm: 'column', md: 'row' }}
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                spacing={4}
                maxWidth="100%"
                width={1000}
                flexWrap="wrap"
                sx={{
                  marginTop: 5,
                }}
              >
                {categories.map((category, k) => (
                  <CategoryButton key={k} text={category} />
                ))}
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
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
                    placeholder="Search Articles"
                    inputProps={{ 'aria-label': 'search an article' }}
                  />
                </Paper>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  marginBlock: 3,
                }}
              >
                <Typography variant="body2" color="info.contrastText">
                  Showing 20 of 20
                </Typography>
                <Box>
                  <Button
                    color="inherit"
                    size="large"
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownRounded />}
                    sx={{
                      '& .MuiButton-endIcon': {
                        transition: '0.25s transform',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      },
                    }}
                  >
                    Order by
                  </Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem sx={listItemSx} selected={false}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Most recent" />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="From A to Z" />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="From Z to A" />
                    </MenuItem>
                    <MenuItem sx={listItemSx}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="Reading time" />
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </FormGroup>
          </Stack>
        </Section>
        <Section sx={{ paddingTop: 0 }}>
          <Stack
            direction="column"
            alignItems="center"
            spacing={4.5}
            sx={{
              '& > *': {
                width: 'clamp(300px, 95%, 1000px)',
              },
              margin: 2,
            }}
          >
            <MaybeShow show={!isValidating && !error}>
              {(data ?? []).map((article, i) => {
                return <BlogArticleCard key={i} article={article} />;
              })}
            </MaybeShow>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
