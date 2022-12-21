import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MaybeShow, NextImg, Page, Section, Sections } from '@whub/wui';
import { useEffect } from 'react';
import { BlogArticle } from '../../components/cards/BlogArticleCard';
import { articles } from './articles';
import parse from 'html-react-parser';
import Head from 'next/head';

import Quote from '../../components/blog/Quote';
import CodeSnippet from '../../components/blog/CodeSnippet';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const getArticle = (name: string) => {
  const article = articles.find((a) => a.name === name);
  return Promise.resolve(article);
};

export async function getStaticProps({ params }) {
  const articleName = params['articleName'];
  const article = await getArticle(articleName);

  return {
    props: {
      article,
    },
  };
}

interface AritcleProps {
  readonly article: BlogArticle;
}

export default function Article(props: AritcleProps) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  if (!props.article) return null;
  return (
    <Page>
      <Head>
        <title>Webion - {props.article.title}</title>
        <meta content={props.article.title} name="description" />
        <meta content={props.article.title} property="og:title" />
        <meta content={props.article.title} property="og:description" />
        <meta content={props.article.title} property="twitter:title" />
        <meta content={props.article.title} property="twitter:description" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="keywords" content={props.article.title} />
      </Head>
      <Sections>
        <MaybeShow
          show={!!props.article}
          alternativeChildren={<>Errore articolo non trovato</>}
        >
          <Section
            sx={{
              paddingInline: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              {props.article.title}
            </Typography>
            <Stack
              direction="row"
              gap={4}
              sx={{
                marginTop: 4,
              }}
            >
              <Typography variant="body1" color="secondary">
                {props.article.date}
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                sx={{ fontWeight: 'bold' }}
              >
                {props.article.category}
              </Typography>
            </Stack>
            <Box
              sx={{
                marginTop: 5,
                maxWidth: '100%',
                width: '900px',
                borderRadius: (theme) => theme.shape.borderRadius,
                overflow: 'hidden',
                height: '400px',
              }}
            >
              <NextImg
                src={props.article.image}
                alt={props.article.image}
                fill
                sx={{
                  objectFit: 'cover',
                  position: 'relative !important',
                }}
              />
            </Box>
            <Box
              sx={{
                maxWidth: 900,
                marginTop: 4,
              }}
            >
              {parse(props.article.article ?? '')}
            </Box>
            <Box
              sx={{
                maxWidth: 900,
                marginTop: 4,
              }}
            >
              <CodeSnippet text="function ciao(){test}" language="javascript" />
              <Quote text="Controlling accidental complexity is the essence of computer programming" />
            </Box>
          </Section>
        </MaybeShow>
      </Sections>
    </Page>
  );
}
