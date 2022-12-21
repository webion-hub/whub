import { Paper, useTheme } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeSnippet(props) {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <SyntaxHighlighter
        sx={{
          height: '100%',
          margin: 0,
        }}
        language={props.language}
        style={theme.palette.mode === 'dark' ? dracula : docco}
      >
        {props.text}
      </SyntaxHighlighter>
    </Paper>
  );
}
