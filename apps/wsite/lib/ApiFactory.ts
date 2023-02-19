import { BlogApi } from '@webion/api-blog/index';
import { ContactUsApi } from '@webion/api-contactus/index';

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