import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { blogCategories } from '../../components/cards/BlogArticleCard';
import { useLanguage } from '@whub/wui';

export default function CreateArticleForm(props) {
  const [category, setCategory] = useState('business');
  const { t } = useLanguage();
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
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

        <TextField id="title" label="title" variant="outlined" />
        <TextField id="cover" label="cover" variant="outlined" />
        <Select
          labelId="Category"
          id="category"
          value={category}
          label="category"
          onChange={handleCategoryChange}
        >
          {blogCategories.map((c, i) => (
            <MenuItem key={i} value={c}>
              {t(c)}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </form>
  );
}
