import { ArrowBackRounded } from '@mui/icons-material';
import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AppContext } from '@whub/apis-react';
import { BlogArticle } from '@whub/apis/blog';
import { MaybeShow, NextImg, Page, Section, Sections, useLanguage, useNextNavigator } from '@whub/wui';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import HeadMeta from '../../components/blog/HeadMeta';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { Article } from './Article';

export async function getServerSideProps({ locale, params }) {
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


export default function ArticlePage({ fallback }) {
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
        <GetAQuoteSection />
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
