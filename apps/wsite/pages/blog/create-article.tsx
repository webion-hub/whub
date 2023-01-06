import { CloseRounded, PreviewRounded } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { MaybeShow, Page, Section, Sections, useNextNavigator } from '@whub/wui';
import { useRef, useState } from 'react';
import { Article } from './Article';
import CreateArticleForm, { ICreateArticle } from './CreateArticleForm';

export default function ReacteArticle() {
  const article = useRef<ICreateArticle>({
    category: 'business',
    content: '',
    cover: '',
    title: ''
  })

  const [showPreview, setShowPreview] = useState(false)

  const onAddArticleHandler = (articleData: ICreateArticle) => {
    /*fetch(
      'https://webionblog-default-rtdb.europe-west1.firebasedatabase.app/articles.json',
      {
        method: 'POST',
        body: JSON.stringify(articleData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      navigate('/blog');
    });*/
  };
  return (
    <Page>
      <Sections>
        <Section
          sx={{
            alignItems: "flex-start",
            paddingInline: 2
          }}
        >
          <Typography
            sx={{ marginTop: 4 }}
            variant="h3"
            component="h1"
            textAlign="center"
          >
            Create article
          </Typography>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            endIcon={
              showPreview
              ? <CloseRounded/>
              : <PreviewRounded/>
            }
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            {
              showPreview
                ? 'Chiudi'
                : 'Mostra preview'
            }
          </Button>
          <Box
            sx={{
              width: '100%',
              opacity: showPreview ? 0 : 1,
              position: showPreview ? 'absolute' : 'relative',
              zIndex: showPreview ? -1 : 'auto'
            }}
          >
            <CreateArticleForm
              onAddArticle={onAddArticleHandler}
              onChange={a => article.current = a}
            />
          </Box>
          <MaybeShow
            show={showPreview}
          >
            <Article
              category={article.current.category}
              article={article.current.content}
              image={article.current.cover}
              title={article.current.title}
            />
          </MaybeShow>
        </Section>
      </Sections>
    </Page>
  );
}
