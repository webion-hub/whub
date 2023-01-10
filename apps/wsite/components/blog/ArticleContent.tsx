import { styled } from '@mui/material';
import { Box } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import CodeSnippet from './CodeSnippet';
interface ArticleContentProps {
  readonly content: string;
}

export default function ArticleContent(props: ArticleContentProps) {
  return (
    <Box
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
          code: (props) => (
            <CodeSnippet
              language={props.lang}
              text={props.children as string}
            />
          )
        }}
      >
        {props.content}
      </ReactMarkdown>
    </Box>
  );
}



const ArticleHyperlink = styled('h1')(({ theme }) => ({
  "&::before": {
    display: 'block',
    content: '""',
    visibility: 'hidden',
    height: theme.mixins.toolbar.height + 'px',
    marginTop: -theme.mixins.toolbar.height + 'px'
  }
}))
