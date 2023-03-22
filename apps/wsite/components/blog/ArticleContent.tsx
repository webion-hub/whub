import { styled, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { fromEvent } from 'rxjs';
import { useArticlePos } from '../../pages/blog/[webId]';
import CodeSnippet from './CodeSnippet';
interface ArticleContentProps {
  readonly content: string;
}

export default function ArticleContent(props: ArticleContentProps) {
  const articleContainerRef = useRef<HTMLDivElement>()
  const theme = useTheme()
  const { setPos } = useArticlePos()

  const markdown = useMemo(
    () => (
      <ReactMarkdown
        components={{
          h1: (props) => (
            <ArticleHyperlink
              className='Wui-section--hyperlink'
              id={encodeURI(props.children as string)}
            >
              {props.children}
            </ArticleHyperlink>
          ),
          p: (props) => <span style={{ opacity: 0.8 }}>{props.children}</span>,
          code: (props) => (
            <CodeSnippet
              language={props.lang}
              text={props.children as string}
            />
          ),
        }}
      >
        {props.content}
      </ReactMarkdown>
    ),
    [props.content]
  )

  useEffect(() => {
    const sub = fromEvent(window, 'scroll')
      .subscribe(() => {
        const appbarHeight = Number(theme.mixins.toolbar.height)

        const rect = articleContainerRef.current?.getBoundingClientRect()
        const fromTop = -((rect?.top ?? 0) - appbarHeight);
        const height = rect?.height ?? 0
        const availablePageSpace = window.innerHeight - appbarHeight
        const howMuchThePageIsOutWhenTheArticleIsFullyReaded = height - availablePageSpace

        const isSmallArticle = howMuchThePageIsOutWhenTheArticleIsFullyReaded < 0 
        const articlePos = isSmallArticle
          ? 0
          : fromTop / howMuchThePageIsOutWhenTheArticleIsFullyReaded

        setPos(articlePos)
      }) 

    return () => sub.unsubscribe()
  }, [articleContainerRef.current])

  return (
    <Box
      ref={articleContainerRef}
      sx={{
        img: {
          width: '100%',
          borderRadius: (theme) => theme.shape.borderRadius,
          fontSize: '1.25rem !important',
        },
        '& > *': {
          maxWidth: '100%',
        },
      }}
    >
      {markdown}
    </Box>
  );
}

const ArticleHyperlink = styled('h1')(({ theme }) => ({
  "&::before": {
    display: 'block',
    content: '""',
    visibility: 'hidden',
    height: theme.mixins.toolbar.height + 'px',
    marginTop: -(theme.mixins.toolbar.height ?? 0) + 'px'
  }
}))
