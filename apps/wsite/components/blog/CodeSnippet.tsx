import { CopyAllRounded } from '@mui/icons-material';
import { IconButton, Paper, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/cjs/styles/hljs/docco';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/hljs/dracula';

interface CodeSnippetProps {
  readonly language?: string;
  readonly text: string;
}

export default function CodeSnippet(props: CodeSnippetProps) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted)
    return (
      <code>
        {props.text}
      </code>
    )

  return (
    <Paper
      component='span'
      sx={{
        display: 'block',
        maxWidth: '100%',
        margin: 'auto',
        overflow: 'hidden',
        "& > pre": {
          margin: 0,
          fontSize: '80%',
          padding: theme => theme.spacing(2, '!important')
        }
      }}
    >
      <SyntaxHighlighter
        language={props.language}
        style={
          theme.palette.mode === 'dark'
            ? dracula
            : docco
        }
        wrapLongLines={'false'}
      >
        {props.text}
      </SyntaxHighlighter>
    </Paper>
  );
}
