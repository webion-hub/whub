import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';

import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blogFactory } from '@wapi-ui/blog';
import { BlogArticle } from '@wapi/blog';
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
import { Article } from '../../components/blog/Article';
import HeadMeta from '../../components/others/HeadMeta';
import GetAQuote from '../../components/sections/GetAQuote';


const getArticle = (lang: string, id: number) => {
  return blogFactory()
    .articles
    .forLanguage(lang)
    .withId(id);
}

export async function getServerSideProps({ locale, params, res }: any) {
  const endpoint = getArticle(locale, params.webId);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  try {
    const res = await endpoint.load();
    return {
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
        destination: '/blog',
        permanent: false,
      }
    };
  }
}


export default function ArticlePage({ fallback, webId }: any) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  if (!webId) {
    return null;
  }

  return (
    <Page>
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
        onClick={clickNavigate('/blog')}
      >
        {t('back-to-articles')}
      </Button>
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
      </MaybeShow>
    </Stack>
  )
}
