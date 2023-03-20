
import { usePages } from '../states/usePages';
import EmailPage from './_email';
import FormPage from './_form';




export default function Homepage() {
  const { page } = usePages()

  return {
    'form': <FormPage/>, 
    'email': <EmailPage/>, 
  }[page];
}
