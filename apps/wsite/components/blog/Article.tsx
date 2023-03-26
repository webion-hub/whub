import { Stack } from "@mui/material";
import { BlogArticle } from "@wapi/blog";
import { MaybeShow } from "@wui/components";
import dynamic from "next/dynamic";
import ArticleContent from "./ArticleContent";
import ArticleTitle from "./ArticleTitle";
import Cover from "./Cover";

const DateCategoryTime = dynamic(() => import("./DateCategoryTime"), { ssr: false })

export function Article(props: Partial<BlogArticle>) {
  return (
    <Stack
      direction="column"
      sx={{ width: '100%' }}
    >
      <ArticleTitle
        title={props.title ?? ''}
      />
      <DateCategoryTime
        date={props.publishDate}
        category={props.category}
        readingTime={props.readingTime}
      />
      <MaybeShow show={!!props.cover && props.cover !== ''}>
        <Cover src={props.cover ?? ''} />
      </MaybeShow>
      <ArticleContent
        content={props.content ?? ''}
      />
    </Stack>
  )
}
