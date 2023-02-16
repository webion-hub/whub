import CloseRounded from '@mui/icons-material/CloseRounded';
import PreviewRounded from '@mui/icons-material/PreviewRounded';

import { Box, Button, Typography } from '@mui/material';
import { Article } from '../../components/blog/Article';
import { useRef, useState } from 'react';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import { useNextNavigator } from '@webion/ui-core';
import CreateArticleForm, { ICreateArticle } from '../../components/blog/CreateArticleForm';
import Page from '@webion/ui-layout/Page';
import Sections from '@webion/ui-layout/Sections';
import Section from '@webion/ui-layout/Section';
import { FullScreenLoading, MaybeShow } from '@webion/ui-components';
import { useBlog } from '@webion/api-ui-blog';

export default function CreateArticle() {
  const { navigate } = useNextNavigator()
  const { language } = useLanguage()
  const blogApi = useBlog()

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
              content={article.current.content}
              cover={article.current.cover}
              title={article.current.title}
            />
          </MaybeShow>
        </Section>
      </Sections>
    </Page>
  );
}
