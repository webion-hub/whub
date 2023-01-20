import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';

import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BlogArticle } from '@wapi/blog';
import AppContext from '@wapi/next';
import { MaybeShow } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { Article } from '../../components/blog/Article';
import HeadMeta from '../../components/others/HeadMeta';

const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export async function getServerSideProps({ locale, params }: any) {
  const endpoint = AppContext.blogApi.articles.forLanguage(locale).withId(params.webId);

  try {
    const res = await endpoint.load();
    return {
      props: {
        fallback: {
          article: res.data,
        },
      },
    };
  }
  catch {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      }
    };
  }
}


export default function ArticlePage({ fallback }: any) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const article: BlogArticle | undefined = fallback?.article

  if (!article) {
    return null;
  }

  return (
    <Page>
      <HeadMeta title={article.title} />
      <Sections>
        <Section
          sx={{
            paddingInline: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{
              width: '100%',
              '& >  *': {
                paddingBlock: 2,
              },
            }}
          >
            <MaybeShow show={isMd}>
              <ArticleSidebar/>
            </MaybeShow>
            <Article {...article}/>
          </Stack>
        </Section>
        <GetAQuote />
      </Sections>
    </Page>
  );
}


function ArticleSidebar() {
  const { clickNavigate } = useNextNavigator()

  const [sections, setSections] = useState([] as string[])
  const [currentSection, setCurrentSection] = useState('')

  const articleRef = useRef<NodeListOf<Element>>()
  const { t } = useLanguage()

  useLayoutEffect(() => {
    setScrollBehavior('smooth')
    return () => setScrollBehavior('auto')
  }, [])

  useEffect(() => {
    if(!document)
      return

    articleRef.current = document.querySelectorAll('.Wui-section--hyperlink')

    const elements = Array.from(articleRef.current)
    const sectionsList = elements.map((e) => e.innerHTML)

    setSections(sectionsList)
    updateCurrentSection()

    const sub = fromEvent(window, 'scroll')
      .subscribe(updateCurrentSection)

    return () => sub.unsubscribe()
  }, [])

  const setScrollBehavior = (type: 'smooth' | 'auto') => {
    document.documentElement.style.scrollBehavior = type
  }

  const updateCurrentSection = () => {
    if(!articleRef.current)
      return

    const elements = Array.from(articleRef.current)
    const current = elements.find(e => e.getBoundingClientRect().top > 0)
    setCurrentSection(current?.id ?? '')
  }

  return (
    <Stack
      direction="column"
      sx={{
        position: 'sticky',
        top: theme => theme.mixins.toolbar.height,
        width: 400,
      }}
    >
      <Button
        startIcon={<ArrowBackRounded/>}
        sx={{ justifyContent: 'flex-start' }}
        onClick={clickNavigate('blog')}
      >
        Torna agli articoli
      </Button>
      <Typography
        variant="h6"
      >
        {t('sections')}
      </Typography>
      <Divider/>
      <List>
        {
          sections.map((s, i) => {
            const uri = encodeURI(s)
            return (
              <ListItem
                key={i}
                disablePadding
              >
                <ListItemButton
                  href={`#${uri}`}
                  selected={uri === currentSection}
                  sx={{
                    borderRadius: 2
                  }}
                >
                  <ListItemText secondary={`${i + 1}. ${s}`}/>
                </ListItemButton>
              </ListItem>
            )
          })
        }

      </List>
    </Stack>
  )
}
