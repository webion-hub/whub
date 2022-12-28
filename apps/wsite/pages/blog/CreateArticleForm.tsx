import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import {
  BlogArticle,
  blogCategories,
  Categories,
} from '../../components/cards/BlogArticleCard';
import { useLanguage } from '@whub/wui';
import { Label } from '@mui/icons-material';
import { Box } from '@mui/system';
interface ICreateArticle {
  title: string;
  cover: string;
  category: Categories;
  content: string;
}
export default function CreateArticleForm(props) {
  // const [category, setCategory] = useState('business');
  const { t } = useLanguage();
  // const handleCategoryChange = (event: SelectChangeEvent) => {
  //   setCategory(event.target.value as string);
  // };
  const form = React.useRef<ICreateArticle>({
    title: '',
    cover: '',
    category: 'business',
    content: '',
  });
  const update = (key, value) => {
    form.current[key] = value;
  };

  const handleChange = (key) => (e) => {
    update(key, e.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form.current);
    props.onAddArticle(form.current);
  };
  return (
    <form>
      <Stack
        direction="column"
        gap={3}
        alignContent="center"
        width={500}
        sx={{
          margin: 'auto',
          marginBlock: 10,
        }}
      >
        <Typography variant="h3" component="h1" textAlign="center">
          Create article
        </Typography>

        <TextField
          id="title"
          label="title"
          variant="outlined"
          onChange={handleChange('title')}
        />
        <TextField
          id="cover"
          label="cover"
          variant="outlined"
          onChange={handleChange('cover')}
        />
        <Stack gap={1}>
          <Typography>Category</Typography>
          <Select
            labelId="Category"
            id="category"
            value={blogCategories[0]}
            onChange={handleChange('category')}
          >
            {blogCategories.map((c, i) => (
              <MenuItem key={i} value={c}>
                {t(c)}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <TextField
          id="content"
          label="content"
          variant="outlined"
          onChange={handleChange('content')}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
