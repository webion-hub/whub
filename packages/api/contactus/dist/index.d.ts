import { Endpoint, ApiBase } from '@webion/api-core';
import { AxiosResponse } from 'axios';

declare class ContactUsEndpoint extends Endpoint {
    get url(): string;
    process<T>(request: T): Promise<AxiosResponse<void>>;
}

declare class ContactUsApi extends ApiBase {
    get contactUs(): ContactUsEndpoint;
}

export { ContactUsApi, ContactUsApi as default };
