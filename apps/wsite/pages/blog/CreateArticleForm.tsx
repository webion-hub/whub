import { Box, Button, styled, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Dropdown, MaybeShow, SquareAddImage, SquareImageContainer } from '@whub/wui';
import * as React from 'react';
import {
  blogCategories,
  Categories
} from '../../components/cards/BlogArticleCard';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
}))

export interface ICreateArticle {
  title: string;
  cover: string;
  category: Categories;
  content: string;
}

interface CreateArticleFormProps {
  readonly onAddArticle?: (article: ICreateArticle) => void,
  readonly onChange?: (article: ICreateArticle) => void,
}

export default function CreateArticleForm(props: CreateArticleFormProps) {
  const [form, setForm] = React.useState<ICreateArticle>({
    title: '',
    cover: '',
    category: 'business',
    content: '',
  });

  React.useEffect(() => {
    props.onChange?.(form)
  }, [form, props])

  const update = <T extends keyof ICreateArticle,>(key: T, value: ICreateArticle[T]) => {
    setForm(form => ({
      ...form,
      [key]: value
    }))
  };

  const handleChange =
    <T extends keyof ICreateArticle,>(key: T) =>
    <G extends { target: { value: ICreateArticle[T] } },>(e: G) =>
  {
    update(key, e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddArticle?.(form);
  };

  return (
    <StyledForm>
      <Stack
        direction="column"
        spacing={3}
        alignContent="center"
        sx={{
          margin: 'auto',
          marginBlock: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ maxWidth: 500 }}
        >
          <Box>
            <MaybeShow
              show={form.cover === ''}
              alternativeChildren={
                <SquareImageContainer
                  aspectRatio={3}
                  src={form.cover}
                  onDelete={() => handleChange('cover')({ target: { value: '' } })}
                />
              }
            >
              <SquareAddImage
                aspectRatio={3}
                onAddImage={value => handleChange('cover')({ target: { value } })}
              />
            </MaybeShow>
          </Box>
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              size='small'
              value={form.title}
              onChange={handleChange('title')}
            />
            <Dropdown
              fullWidth
              elements={(blogCategories as unknown) as string[]}
              value={form.category}
              getOptionLabel={e => e}
              getValue={e => e}
              label="Category"
              size='small'
              onValueChange={value => handleChange('category')({ target: { value: value as Categories } })}
            />
          </Stack>
        </Stack>

        <TextField
          id="content"
          label="Content"
          variant="outlined"
          size='small'
          fullWidth
          multiline
          rows={20}
          onChange={handleChange('content')}
        />
        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </StyledForm>
  );
}
