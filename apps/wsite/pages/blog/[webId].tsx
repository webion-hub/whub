import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';

import { Button, CircularProgress, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blogFactory } from '@wapi-ui/blog';
import { MaybeShow } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import useSWR, { SWRConfig } from 'swr';
import { create } from 'zustand';
import { Article } from '../../components/blog/Article';
import HeadMeta from '../../components/others/HeadMeta';
import GetAQuote from '../../components/sections/GetAQuote';


const getArticle = (lang: string, id: number) => {
  return blogFactory()
    .articles
    .forLanguage(lang)
    .withId(id);
}

export async function getStaticPaths() {
  const request = await blogFactory()
    .sitemap
    .load();

  const paths = request
    .data
    .map(a => ({ 
      params: { webId: a.webId }, 
      locale: a.language.toLowerCase() 
    }))

  return { paths, fallback: true }
}

export async function getStaticProps({ locale, params }: any) {
  const endpoint = getArticle(locale, params.webId);

  try {
    const res = await endpoint.load();
    return {
      revalidate: 1,
      props: {
        webId: params.webId,
        fallback: {
          [endpoint.url]: res.data,
        },
      },
    };
  }
  catch {
    return {
      redirect: {
        destination: `/${locale}/blog`,
        permanent: false,
      }
    };
  }
}

interface ArticlePos {
  pos: number,
  setPos: (pos: number) => void
} 

export const useArticlePos = create<ArticlePos>((set) => ({
  pos: 0,
  setPos: (pos: number) => set(() => {
    const inTopRange = pos >= 1 ? 1 : pos
    const inRange = inTopRange <= 0 ? 0 : inTopRange
    
    return { pos: inRange }
  }),
})) 

export default function ArticlePage({ fallback, webId }: any) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const { clickNavigate } = useNextNavigator()
  const { t } = useLanguage()
  const router = useRouter()

  if (!webId || router.isFallback) {
    return null;
  }

  return (
    <Page>
      <Sections>
        <Section
          sx={{ paddingInline: 2 }}
        >
          <MaybeShow show={!isMd}>
            <Button
              variant='outlined'
              startIcon={<ArrowBackRounded/>}
              onClick={clickNavigate('/blog')}
              sx={{ 
                justifyContent: 'flex-start', 
                marginTop: 4 
              }}
            >
              {t('back-to-articles')}
            </Button>
          </MaybeShow>
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
            <SWRConfig value={{ fallback }}>
              <ArticleWrapper webId={webId}/>
            </SWRConfig>
          </Stack>
        </Section>
        <GetAQuote />
      </Sections>
    </Page>
  );
}

function ArticleWrapper({ webId }: { webId: number }) {
  const { locale } = useRouter()
  const endpoint = getArticle(locale ?? '', webId)
  
  const { data } = useSWR(endpoint.url, async () => {
    const res = await endpoint.load()
    return res.data
  })

  return (
    <>
      <HeadMeta title={data?.title ?? ''} />
      <Article {...data}/>
    </>
  )
}


function ArticleSidebar() {
  const { clickNavigate } = useNextNavigator()
  const { pos } = useArticlePos()

  const [sections, setSections] = useState([] as string[])
  const [currentSection, setCurrentSection] = useState('')

  const { t } = useLanguage()

  useLayoutEffect(() => {
    setScrollBehavior('smooth')
    return () => setScrollBehavior('auto')
  }, [])

  useEffect(() => {
    if(!document)
      return

    const elements = Array.from(getSections())
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
    const elements = Array.from(getSections())
    const current = elements.find(e => {
      return e.getBoundingClientRect().top > 0})
    setCurrentSection(current?.id ?? '')
  }

  const getSections = () => {
    return document.querySelectorAll('.Wui-section--hyperlink')
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
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Button
          startIcon={<ArrowBackRounded/>}
          sx={{ justifyContent: 'flex-start' }}
          onClick={clickNavigate('/blog')}
        >
          {t('back-to-articles')}
        </Button>
        <CircularProgress
          variant="determinate"
          value={pos * 100}
          sx={{ 
            '.MuiCircularProgress-circle': {
              transition: 'none !important'
            } 
          }}
        />
      </Stack>
      <Typography
        variant="h6"
      >
        {t('sections')}
      </Typography>
      <Divider/>
      <MaybeShow
        show={sections.length !== 0}
        alternativeChildren={
          <Typography variant='caption' color="text.secondary">
            {t('no-sections')}
          </Typography>
        }
      >
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
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemText secondary={s}/>
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </List>
      </MaybeShow>
    </Stack>
  )
}
