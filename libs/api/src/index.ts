import ContactUsEndpoint from "./lib/endpoints/ContactUsEndpoint";
import CustomersEndpoint from "./lib/endpoints/CustomersEndpoint";

export * from "./lib/handlers";
export * from "./lib/model/contact-information";
export * from "./lib/model/customer";
export * from "./lib/responses/problem-details";
export * from "./lib/status-code";
export * from "./lib/config";
export * from "./lib/requests/ContactUsRequest";
export * from "./lib/requests/CreateCustomerRequest";
export * from "./lib/requests/CreateCustomerRequest";

export * from "./lib/api-base";
export * from "./lib/settings/api-config";

export * from "./lib/ApiContext";

export const api = {
  contactUs: ContactUsEndpoint,
  customers: CustomersEndpoint,
}
