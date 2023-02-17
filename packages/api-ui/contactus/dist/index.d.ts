import { ContactUsApi } from '@webion/api-contactus';

declare const contactUsFactory: () => ContactUsApi;
declare const useContactUs: () => ContactUsApi;

export { contactUsFactory, useContactUs };
