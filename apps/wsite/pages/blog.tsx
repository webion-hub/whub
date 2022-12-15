import {
  CheckBox,
  DevicesRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack, SxProps, Theme } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import CheckboxButton from '../components/CheckboxButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import BlogArticleCard from '../components/cards/BlogArticleCard';

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
  const { t } = useLanguage();
  return (
    <Page>
      <PageSettings pageTranslationName="blog" />
      <Sections>
        <Section sx={{ paddingBottom: 0 }}>
          <Stack
            direction="column"
            spacing={4}
            alignItems="center"
            sx={{ paddingTop: 10 }}
          >
            {/* <Box>
              <Chip label="The webion blog" variant="filled" color="primary" />
            </Box> */}
            <Typography
              variant="h2"
              component="h1"
              // sx={{
              //   background:
              //     '-webkit-linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,23,116,1) 100%)',
              //   '-webkit-background-clip': 'text',
              //   '-webkit-text-fill-color': 'transparent',
              // }}
            >
              The Webion blog
            </Typography>
            <Typography variant="h5" component="h2">
              Exploring the Intersection of Computer Science, Business, Design,
              and Technology
            </Typography>
            <FormGroup>
              <Stack
                direction="row"
                alignItems="center"
                alignContent="center"
                spacing={4}
                flexWrap="wrap"
              >
                <CheckboxButton text="Business"></CheckboxButton>
                <CheckboxButton text="Coding"></CheckboxButton>
                <CheckboxButton text="Design"></CheckboxButton>
                <CheckboxButton text="Other"></CheckboxButton>
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 400,
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
                <Typography variant="body2">Showing 20 of 20</Typography>
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
          <Stack direction="column" alignItems="center" spacing={4.5}>
            <BlogArticleCard
              date="13 Agosto 2022"
              category="Business"
              title="E sticazzi. Una guida completa sullo sticazzi"
              timeToRead="5 min"
              firstSentence="Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi "
              image="/assets/images/blog/abstract.jpg"
              alt="abstract"
              link="http://localhost:4200/blog/seven-reasons-to-outsource"
            />
            <BlogArticleCard
              date="13 Agosto 2022"
              category="Business"
              title="E sticazzi. Una guida completa sullo sticazzi"
              timeToRead="5 min"
              firstSentence="Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi "
              image="/assets/images/blog/abstract.jpg"
              alt="abstract"
              link="http://localhost:4200/blog/seven-reasons-to-outsource"
            />
            <BlogArticleCard
              date="13 Agosto 2022"
              category="Business"
              title="E sticazzi. Una guida completa sullo sticazzi"
              timeToRead="5 min"
              firstSentence="Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi "
              image="/assets/images/blog/abstract.jpg"
              alt="abstract"
              link="http://localhost:4200/blog/seven-reasons-to-outsource"
            />
            <BlogArticleCard
              date="13 Agosto 2022"
              category="Business"
              title="E sticazzi. Una guida completa sullo sticazzi"
              timeToRead="5 min"
              firstSentence="Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi "
              image="/assets/images/blog/abstract.jpg"
              alt="abstract"
              link="http://localhost:4200/blog/seven-reasons-to-outsource"
            />
            <BlogArticleCard
              date="13 Agosto 2022"
              category="Business"
              title="E sticazzi. Una guida completa sullo sticazzi"
              timeToRead="5 min"
              firstSentence="Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi Lorem ipsum e sticazzi "
              image="/assets/images/blog/abstract.jpg"
              alt="abstract"
              link="http://localhost:4200/blog/seven-reasons-to-outsource"
            />
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
