import { Page, useNextNavigator } from '@whub/wui';
import CreateArticleForm from './CreateArticleForm';

export default function ReacteArticle() {
  const { clickNavigate, navigate } = useNextNavigator();
  const onAddArticleHandler = (articleData) => {
    fetch(
      'https://webionblog-default-rtdb.europe-west1.firebasedatabase.app/articles.json',
      {
        method: 'POST',
        body: JSON.stringify(articleData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      navigate('/blog');
    });
  };
  return (
    <Page>
      <CreateArticleForm onAddArticle={onAddArticleHandler} />
    </Page>
  );
}
