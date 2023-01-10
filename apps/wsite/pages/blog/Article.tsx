import { Stack } from "@mui/material";
import { BlogArticle } from "@whub/apis/blog";
import { MaybeShow } from "@whub/wui";
import Cover from '../../components/blog/Cover';
import DateCategoryTime from '../../components/blog/DateCategoryTime';
import Title from '../../components/blog/Title';
import ArticleContent from "./ArticleContent";

export function Article(props: Partial<BlogArticle>) {
  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      <Title>
        {props.title}
      </Title>
      <DateCategoryTime
        date={props.publishDate}
        category={props.category}
        readingTime={props.readingTime}
      />
      <MaybeShow show={props.cover !== ''}>
        <Cover src={props.cover} />
      </MaybeShow>
      <ArticleContent
        content={props.content}
      />
    </Stack>
  )
}
