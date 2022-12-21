import { Paper, useTheme } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-dune-dark';
// import { light } from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-dune-light';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula';

interface CodeSnippetProps {
  readonly language: string;
  readonly text: string;
}

export default function CodeSnippet(props: CodeSnippetProps) {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        maxWidth: '100%',
        margin: 'auto',
      }}
    >
      <SyntaxHighlighter
        sx={{
          height: '100%',
          margin: 0,
          overflowX: 'hidden',
        }}
        language={props.language}
        style={theme.palette.mode === 'dark' ? dracula : docco}
        wrapLongLines={'false'}
      >
        {props.text}
      </SyntaxHighlighter>
    </Paper>
  );
}
