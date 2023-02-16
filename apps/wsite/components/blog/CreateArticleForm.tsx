import { Box, Button, styled, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { blogCategories, BlogCategories } from '@webion/api-blog';
import { Dropdown, MaybeShow } from '@webion/ui-components';
import { SquareAddImage, SquareImageContainer } from '@webion/ui-squares';
import { useEffect, useState } from 'react';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
}))
export interface ICreateArticle {
  title: string;
  cover: string;
  category: BlogCategories;
  content: string;
}

interface CreateArticleFormProps {
  readonly onAddArticle?: (article: ICreateArticle) => void,
  readonly onChange?: (article: ICreateArticle) => void,
}

export default function CreateArticleForm(props: CreateArticleFormProps) {
  const [form, setForm] = useState<ICreateArticle>({
    title: '',
    cover: '',
    category: 'Business',
    content: '',
  });

  useEffect(() => {
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

  const submitHandler = (event: any) => {
    event.preventDefault();
    props.onAddArticle?.(form);
  };

  return (
    <StyledForm
      onSubmit={submitHandler}
    >
      <Stack
        direction="column"
        spacing={2}
        alignContent="center"
        sx={{
          margin: 'auto',
          marginBlock: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}
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
              required
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
              onValueChange={value => handleChange('category')({ target: { value: value as BlogCategories } })}
            />
          </Stack>
        </Stack>

        <TextField
          required
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
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </StyledForm>
  );
}
