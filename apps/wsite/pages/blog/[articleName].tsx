import { Page, Section, Sections } from '@whub/wui';
import HeadMeta from '../../components/blog/HeadMeta';
import { BlogArticle } from '../../components/cards/BlogArticleCard';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { Article } from './Article';
import { articles } from './articles';


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

export default function ArticlePage(props: AritcleProps) {
  if (!props.article)
    return null;

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
          <Article
            {...props.article}
          />
        </Section>

        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
