import { Stack } from "@mui/material";
import { BlogArticle } from "../../components/cards/BlogArticleCard";
import Cover from '../../components/blog/Cover';
import DateCategoryTime from '../../components/blog/DateCategoryTime';
import Title from '../../components/blog/Title';
import ArticleContent from "./ArticleContent";
import { useLanguage } from "@whub/wui";

export function Article(props: Partial<BlogArticle>) {
  const { language } = useLanguage();

  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      <Title>
        {
          language.code == 'it'
            ? props.title
            : props.titleEn
        }
      </Title>
      <DateCategoryTime
        date={props.date}
        category={props.category}
        readingTime={props.readingTime}
      />
      <Cover src={props.image} />
      <ArticleContent
        content={
          language.code == 'it'
            ? props.article
            : props.articleEn ?? ''
        }
      />
    </Stack>
  )
}
