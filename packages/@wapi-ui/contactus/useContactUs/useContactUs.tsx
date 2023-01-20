import { ContactUsApi } from "@wapi/contactus";
import ContactUsContext from "../ContactUsContext/ContactUsContext";

export const contactUsFactory = () => new ContactUsApi(ContactUsContext.api)
export const useContactUs = () => contactUsFactory()