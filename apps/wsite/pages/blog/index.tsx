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
  Typography
} from '@mui/material';
import { Box, Stack, SxProps, Theme } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import { useState } from 'react';
import BlogArticleCard, {
  BlogArticle
} from '../../components/cards/BlogArticleCard';
import CategoryButton from '../../components/CategoryButton';

export const articles: BlogArticle[] = [
  {
    id: 1,
    name: 'nome',
    title: "Lorem Ipsum",
    category: "Business",
    readingTime: 5,
    date: "21 Mag 2021",
    image: "/assets/images/websites.jpg",
    article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum feugiat aliquam. Vivamus id arcu vitae tellus ultricies tincidunt. Phasellus varius condimentum sapien in dignissim. In dapibus in leo sed pellentesque. Mauris sit amet mattis risus. Vestibulum lacinia rhoncus justo. Cras congue tortor fringilla pellentesque malesuada. Maecenas nec neque risus. Proin porta sed augue quis condimentum. Vestibulum ullamcorper odio vitae ex facilisis cursus. Donec augue felis, ultricies sed ullamcorper et, fermentum eget velit. Sed vel orci quis diam hendrerit fermentum non tincidunt libero. Aliquam justo quam, rutrum ut pretium ac, rhoncus sed dolor. Etiam non est ut arcu condimentum elementum eu non nibh. Nulla a risus sed libero iaculis dictum.<br/><br/> In ultrices tortor eu massa dictum, a vulputate tellus rhoncus. Vestibulum nec erat gravida massa pellentesque dapibus. Proin tempus mauris tortor, in posuere nunc lobortis vitae. Donec sodales augue nec magna auctor aliquet. Phasellus sed justo turpis. Fusce at augue sed quam luctus dapibus sit amet sit amet arcu. Quisque imperdiet, dolor vel aliquet consectetur, dolor ex lacinia sem, vel convallis ligula mi eu neque. Sed in tellus elit. Sed euismod massa sit amet nunc auctor, vel faucibus sem consequat. Vivamus rhoncus sed nisi sit amet eleifend. Etiam id tellus non felis ultricies facilisis nec vel ante. Fusce fringilla diam nibh, quis condimentum est vehicula eget. Aenean malesuada tortor vitae mi aliquam, sit amet efficitur erat vehicula. Aenean pellentesque turpis quis tortor congue vestibulum. Vestibulum euismod luctus elementum. Aliquam tempor tincidunt magna ac lacinia.<br/><br/> Cras dolor velit, auctor eu ante sed, blandit posuere tortor. Vivamus risus libero, pharetra vitae ullamcorper id, pharetra in arcu. Nunc tempor, est pretium hendrerit dignissim, lectus mi consequat tellus, ac pulvinar ligula odio tristique magna. Vivamus lacus arcu, convallis at arcu et, faucibus ultrices risus. Nulla vehicula, nunc eget gravida dictum, nulla dui porta diam, non feugiat arcu neque cursus mauris. Ut magna metus, dictum non feugiat ut, pellentesque sit amet leo. Vestibulum sodales libero in ultrices semper. Quisque blandit nisl ut suscipit elementum. Mauris varius quam aliquet, dapibus nibh non, pellentesque ipsum. Quisque vulputate gravida convallis. Aenean nec feugiat ante. Maecenas scelerisque nisi est, vel vestibulum elit mollis eget. Mauris ut sapien a neque faucibus efficitur vitae dapibus ipsum. Ut tristique ex lectus, sit amet placerat libero varius id. Maecenas dictum dui a mi accumsan, eu finibus nisi luctus. Mauris faucibus suscipit lorem, et pharetra sem semper et.<br/><br/>"
  },
  {
    id: 2,
    name: 'nome',
    title: "Lorem Ipsum",
    category: "Business",
    readingTime: 5,
    date: "21 Mag 2021",
    image: "/assets/images/websites.jpg",
    article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum feugiat aliquam. Vivamus id arcu vitae tellus ultricies tincidunt. Phasellus varius condimentum sapien in dignissim. In dapibus in leo sed pellentesque. Mauris sit amet mattis risus. Vestibulum lacinia rhoncus justo. Cras congue tortor fringilla pellentesque malesuada. Maecenas nec neque risus. Proin porta sed augue quis condimentum. Vestibulum ullamcorper odio vitae ex facilisis cursus. Donec augue felis, ultricies sed ullamcorper et, fermentum eget velit. Sed vel orci quis diam hendrerit fermentum non tincidunt libero. Aliquam justo quam, rutrum ut pretium ac, rhoncus sed dolor. Etiam non est ut arcu condimentum elementum eu non nibh. Nulla a risus sed libero iaculis dictum.<br/><br/> In ultrices tortor eu massa dictum, a vulputate tellus rhoncus. Vestibulum nec erat gravida massa pellentesque dapibus. Proin tempus mauris tortor, in posuere nunc lobortis vitae. Donec sodales augue nec magna auctor aliquet. Phasellus sed justo turpis. Fusce at augue sed quam luctus dapibus sit amet sit amet arcu. Quisque imperdiet, dolor vel aliquet consectetur, dolor ex lacinia sem, vel convallis ligula mi eu neque. Sed in tellus elit. Sed euismod massa sit amet nunc auctor, vel faucibus sem consequat. Vivamus rhoncus sed nisi sit amet eleifend. Etiam id tellus non felis ultricies facilisis nec vel ante. Fusce fringilla diam nibh, quis condimentum est vehicula eget. Aenean malesuada tortor vitae mi aliquam, sit amet efficitur erat vehicula. Aenean pellentesque turpis quis tortor congue vestibulum. Vestibulum euismod luctus elementum. Aliquam tempor tincidunt magna ac lacinia.<br/><br/> Cras dolor velit, auctor eu ante sed, blandit posuere tortor. Vivamus risus libero, pharetra vitae ullamcorper id, pharetra in arcu. Nunc tempor, est pretium hendrerit dignissim, lectus mi consequat tellus, ac pulvinar ligula odio tristique magna. Vivamus lacus arcu, convallis at arcu et, faucibus ultrices risus. Nulla vehicula, nunc eget gravida dictum, nulla dui porta diam, non feugiat arcu neque cursus mauris. Ut magna metus, dictum non feugiat ut, pellentesque sit amet leo. Vestibulum sodales libero in ultrices semper. Quisque blandit nisl ut suscipit elementum. Mauris varius quam aliquet, dapibus nibh non, pellentesque ipsum. Quisque vulputate gravida convallis. Aenean nec feugiat ante. Maecenas scelerisque nisi est, vel vestibulum elit mollis eget. Mauris ut sapien a neque faucibus efficitur vitae dapibus ipsum. Ut tristique ex lectus, sit amet placerat libero varius id. Maecenas dictum dui a mi accumsan, eu finibus nisi luctus. Mauris faucibus suscipit lorem, et pharetra sem semper et.<br/><br/>"
  },
  {
    id: 3,
    name: 'nome',
    title: "Lorem Ipsum",
    category: "Business",
    readingTime: 5,
    date: "21 Mag 2021",
    image: "/assets/images/websites.jpg",
    article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum feugiat aliquam. Vivamus id arcu vitae tellus ultricies tincidunt. Phasellus varius condimentum sapien in dignissim. In dapibus in leo sed pellentesque. Mauris sit amet mattis risus. Vestibulum lacinia rhoncus justo. Cras congue tortor fringilla pellentesque malesuada. Maecenas nec neque risus. Proin porta sed augue quis condimentum. Vestibulum ullamcorper odio vitae ex facilisis cursus. Donec augue felis, ultricies sed ullamcorper et, fermentum eget velit. Sed vel orci quis diam hendrerit fermentum non tincidunt libero. Aliquam justo quam, rutrum ut pretium ac, rhoncus sed dolor. Etiam non est ut arcu condimentum elementum eu non nibh. Nulla a risus sed libero iaculis dictum.<br/><br/> In ultrices tortor eu massa dictum, a vulputate tellus rhoncus. Vestibulum nec erat gravida massa pellentesque dapibus. Proin tempus mauris tortor, in posuere nunc lobortis vitae. Donec sodales augue nec magna auctor aliquet. Phasellus sed justo turpis. Fusce at augue sed quam luctus dapibus sit amet sit amet arcu. Quisque imperdiet, dolor vel aliquet consectetur, dolor ex lacinia sem, vel convallis ligula mi eu neque. Sed in tellus elit. Sed euismod massa sit amet nunc auctor, vel faucibus sem consequat. Vivamus rhoncus sed nisi sit amet eleifend. Etiam id tellus non felis ultricies facilisis nec vel ante. Fusce fringilla diam nibh, quis condimentum est vehicula eget. Aenean malesuada tortor vitae mi aliquam, sit amet efficitur erat vehicula. Aenean pellentesque turpis quis tortor congue vestibulum. Vestibulum euismod luctus elementum. Aliquam tempor tincidunt magna ac lacinia.<br/><br/> Cras dolor velit, auctor eu ante sed, blandit posuere tortor. Vivamus risus libero, pharetra vitae ullamcorper id, pharetra in arcu. Nunc tempor, est pretium hendrerit dignissim, lectus mi consequat tellus, ac pulvinar ligula odio tristique magna. Vivamus lacus arcu, convallis at arcu et, faucibus ultrices risus. Nulla vehicula, nunc eget gravida dictum, nulla dui porta diam, non feugiat arcu neque cursus mauris. Ut magna metus, dictum non feugiat ut, pellentesque sit amet leo. Vestibulum sodales libero in ultrices semper. Quisque blandit nisl ut suscipit elementum. Mauris varius quam aliquet, dapibus nibh non, pellentesque ipsum. Quisque vulputate gravida convallis. Aenean nec feugiat ante. Maecenas scelerisque nisi est, vel vestibulum elit mollis eget. Mauris ut sapien a neque faucibus efficitur vitae dapibus ipsum. Ut tristique ex lectus, sit amet placerat libero varius id. Maecenas dictum dui a mi accumsan, eu finibus nisi luctus. Mauris faucibus suscipit lorem, et pharetra sem semper et.<br/><br/>"
  },
  {
    id: 4,
    name: 'nome',
    title: "Lorem Ipsum",
    category: "Business",
    readingTime: 5,
    date: "21 Mag 2021",
    image: "/assets/images/websites.jpg",
    article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum feugiat aliquam. Vivamus id arcu vitae tellus ultricies tincidunt. Phasellus varius condimentum sapien in dignissim. In dapibus in leo sed pellentesque. Mauris sit amet mattis risus. Vestibulum lacinia rhoncus justo. Cras congue tortor fringilla pellentesque malesuada. Maecenas nec neque risus. Proin porta sed augue quis condimentum. Vestibulum ullamcorper odio vitae ex facilisis cursus. Donec augue felis, ultricies sed ullamcorper et, fermentum eget velit. Sed vel orci quis diam hendrerit fermentum non tincidunt libero. Aliquam justo quam, rutrum ut pretium ac, rhoncus sed dolor. Etiam non est ut arcu condimentum elementum eu non nibh. Nulla a risus sed libero iaculis dictum.<br/><br/> In ultrices tortor eu massa dictum, a vulputate tellus rhoncus. Vestibulum nec erat gravida massa pellentesque dapibus. Proin tempus mauris tortor, in posuere nunc lobortis vitae. Donec sodales augue nec magna auctor aliquet. Phasellus sed justo turpis. Fusce at augue sed quam luctus dapibus sit amet sit amet arcu. Quisque imperdiet, dolor vel aliquet consectetur, dolor ex lacinia sem, vel convallis ligula mi eu neque. Sed in tellus elit. Sed euismod massa sit amet nunc auctor, vel faucibus sem consequat. Vivamus rhoncus sed nisi sit amet eleifend. Etiam id tellus non felis ultricies facilisis nec vel ante. Fusce fringilla diam nibh, quis condimentum est vehicula eget. Aenean malesuada tortor vitae mi aliquam, sit amet efficitur erat vehicula. Aenean pellentesque turpis quis tortor congue vestibulum. Vestibulum euismod luctus elementum. Aliquam tempor tincidunt magna ac lacinia.<br/><br/> Cras dolor velit, auctor eu ante sed, blandit posuere tortor. Vivamus risus libero, pharetra vitae ullamcorper id, pharetra in arcu. Nunc tempor, est pretium hendrerit dignissim, lectus mi consequat tellus, ac pulvinar ligula odio tristique magna. Vivamus lacus arcu, convallis at arcu et, faucibus ultrices risus. Nulla vehicula, nunc eget gravida dictum, nulla dui porta diam, non feugiat arcu neque cursus mauris. Ut magna metus, dictum non feugiat ut, pellentesque sit amet leo. Vestibulum sodales libero in ultrices semper. Quisque blandit nisl ut suscipit elementum. Mauris varius quam aliquet, dapibus nibh non, pellentesque ipsum. Quisque vulputate gravida convallis. Aenean nec feugiat ante. Maecenas scelerisque nisi est, vel vestibulum elit mollis eget. Mauris ut sapien a neque faucibus efficitur vitae dapibus ipsum. Ut tristique ex lectus, sit amet placerat libero varius id. Maecenas dictum dui a mi accumsan, eu finibus nisi luctus. Mauris faucibus suscipit lorem, et pharetra sem semper et.<br/><br/>"
  }
]

export default function Blog() {
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
              width: '100%',
              margin: 2,
              '& > *': {
                width: 'clamp(300px, 95%, 1000px)',
              },
            }}
          >
            {articles.map((article, i) => {
              return <BlogArticleCard key={i} article={article} />;
            })}
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
