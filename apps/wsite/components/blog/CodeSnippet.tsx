import { alpha, Box, IconButton, Paper, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/cjs/styles/hljs/docco';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/hljs/dracula';
import CopyAllRoundedIcon from '@mui/icons-material/CopyAllRounded';

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.text);
  }

  if(!mounted)
    return (
      <code>
        {props.text}
      </code>
    )

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        width: 'min-content',
        maxWidth: '100%',
        margin: 'auto',
        marginBlock: 2,
        overflow: 'hidden',
        borderRadius: 1,
        background: theme => alpha(theme.palette.secondary.light, 0.1),
        "& > pre": {
          margin: 0,
          fontSize: '1rem',
          background: 'none !important',
          padding: theme => theme.spacing(1, '!important')
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
        wrapLongLines={false}
      >
        {props.text}
      </SyntaxHighlighter>
      <Box sx={{ margin: '2px' }}>
        <IconButton onClick={copyToClipboard}>
          <CopyAllRoundedIcon fontSize='small'/>
        </IconButton>
      </Box>
    </Box>
  );
}
