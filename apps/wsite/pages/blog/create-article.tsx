import { CloseRounded, PreviewRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useBlog } from '@whub/apis-react';
import { FullScreenLoading, MaybeShow, Page, Section, Sections, useLanguage, useNextNavigator } from '@whub/wui';
import { useRef, useState } from 'react';
import { Article } from './Article';
import CreateArticleForm, { ICreateArticle } from './CreateArticleForm';

export default function CreateArticle() {
  const { navigate } = useNextNavigator()
  const { language } = useLanguage()
  const blogApi = useBlog().api

  const [loading, setLoading] = useState(false)

  const article = useRef<ICreateArticle>({
    category: 'Business',
    content: '',
    cover: '',
    title: ''
  })

  const [showPreview, setShowPreview] = useState(false)

  const onAddArticleHandler = (articleData: ICreateArticle) => {
    if(!language)
      return

    setLoading(true)
    blogApi.articles
      .create({
        language: language.code,
        ...articleData
      })
      .then(res => navigate(`/blog/${res.data.webId}`))
      .finally(() => setLoading(false))
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
          <FullScreenLoading loading={loading}/>
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
