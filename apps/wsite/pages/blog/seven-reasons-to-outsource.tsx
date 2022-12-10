import { Page } from '@whub/wui';
import BlogArticle from 'apps/wsite/components/BlogArticle';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';

export default function SevenReasonsToOutSource() {
  return (
    <Page>
      <PageSettings pageTranslationName="article-1" />
      <BlogArticle />
    </Page>
  );
}
