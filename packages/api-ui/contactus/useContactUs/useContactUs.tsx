import { ContactUsApi } from "@webion/api-contactus";
import ContactUsContext from "../ContactUsContext/ContactUsContext";

export const contactUsFactory = () => new ContactUsApi(ContactUsContext.api)
export const useContactUs = () => contactUsFactory()