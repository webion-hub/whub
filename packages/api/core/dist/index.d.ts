import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

declare abstract class ResponseMapper<T> {
    private readonly client;
    constructor(client: AxiosInstance);
    mapOne(r: AxiosResponse<T>): AxiosResponse<T>;
    mapMany(r: AxiosResponse<T[]>): AxiosResponse<T[]>;
    abstract map(data: T): T;
    protected mapUrl(path: string): string;
}

declare abstract class Endpoint {
    protected readonly client: AxiosInstance;
    abstract get url(): string;
    constructor(client: AxiosInstance);
    get fullUrl(): string;
    protected at(path: string): string;
}

declare abstract class ApiBase {
    protected readonly client: AxiosInstance;
    constructor(config: AxiosRequestConfig);
}

type HttpCodes = 200 | 201 | 204 | 400 | 401 | 404 | 405 | 409 | 413 | 415 | 'any';
type StatusHandler = () => void | Promise<void>;
type HandleMap = Record<HttpCodes, StatusHandler>;
declare const handleResponse: <T>(response: AxiosResponse<T, any>, errorMap: Partial<HandleMap>) => Promise<void>;

export { ApiBase, Endpoint, ResponseMapper, handleResponse };
