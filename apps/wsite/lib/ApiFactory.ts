import BlogApi from '@webion/api-blog';
import ContactUsApi from '@webion/api-contactus';

export default class ApiFactory {
  static blog = new BlogApi({
    headers: { } as any,
    baseURL: 'https://blog.api.webion.it/',
    withCredentials: true,
  })
  static contactUs = new ContactUsApi({
    headers: { } as any,
    baseURL: 'https://api.webion.it/contactus',
    withCredentials: true,
  })
}