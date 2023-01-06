import Markdown from 'markdown-to-jsx';
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
          fontSize: '1.25rem !important',
        },
      }}
    >
      <Markdown>
        {props.content}
      </Markdown>
    </Box>
  );
}
