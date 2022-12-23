import { Box } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import { useEffect } from 'react';
import { BlogArticle } from '../../components/cards/BlogArticleCard';
import { articles } from './articles';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import DateAndCategory from '../../components/blog/DateAndCategory';
import Cover from '../../components/blog/Cover';
import HeadMeta from '../../components/blog/HeadMeta';
import Title from '../../components/blog/Title';
import ArticleContent from './ArticleContent';
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const getArticle = (name: string) => {
  const article = articles.find((a) => a.name === name);
  return Promise.resolve(article);
};

export async function getStaticProps({ params }) {
  const articleName = params['articleName'];
  const article = await getArticle(articleName);

  return {
    props: {
      article,
    },
  };
}

interface AritcleProps {
  readonly article: BlogArticle;
}

export default function Article(props: AritcleProps) {
  const { t, tHtml, language } = useLanguage();
  useEffect(() => {
    console.log(props);
  }, [props]);
  if (!props.article) return null;
  return (
    <Page>
      <HeadMeta title={props.article.title} />
      <Sections>
        <Section
          sx={{
            paddingInline: 2,
            maxWidth: 900,
            '& >  *': {
              maxWidth: '100%',
              marginBlock: 2,
            },
          }}
        >
          <Title>
            {language.code == 'it'
              ? props.article.title
              : props.article.titleEn}
          </Title>
          <DateAndCategory
            date={props.article.date}
            category={props.article.category}
          />
          <Cover src={props.article.image} />
          <ArticleContent
            content={
              language.code == 'it'
                ? props.article.article
                : props.article.articleEn ?? ''
            }
          />
        </Section>

        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
