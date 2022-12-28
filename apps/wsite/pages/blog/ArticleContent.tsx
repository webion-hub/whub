import { MDXProvider } from '@mdx-js/react';
import { Block } from '@mui/icons-material';
import ImageWithDescription from '../../components/blog/ImageWithDescription';
import Title from '../../components/blog/Title';
import { Component } from 'react';
import parse from 'html-react-parser';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
// const newP = (props) => <p style="color: red" {...props} />;
interface ArticleContentProps {
  readonly content: string;
}
// const MDXComponents = {
//   h1: Title,
//   h2: Title,
// };

export default function ArticleContent(props: ArticleContentProps) {
  const formattedText = props.content
    .replace('<p>', '<Typography component="p">')
    .replace('</p>', '</Typography> ');
  return (
    // <MDXProvider components={MDXComponents}>
    //   {/* <main {...props} />
    //   {props.children} */}
    //   <Component {...props} />
    // </MDXProvider>
    <Box
      sx={{
        img: {
          width: '100%',
          borderRadius: (theme) => theme.shape.borderRadius,
          fontSize: '1.25rem !important',
        },
        '& > *': {
          maxWidth: '100%',
          fontSize: '1.25rem !important',
        },
      }}
    >
      {parse(formattedText)}
    </Box>
  );
}
