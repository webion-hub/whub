import { AxiosResponse } from "axios";

type HttpCodes = 200 | 201 | 204 | 400 | 401 | 404 | 405 | 409 | 413 | 415 | 'any';

type StatusHandler = () => void | Promise<void>;
type HandleMap = Record<HttpCodes, StatusHandler>;

export const handleResponse = async <T>(
  response: AxiosResponse<T>,
  errorMap: Partial<HandleMap>
) => {

  const status = response.status;

  if (status in errorMap) {
    return await errorMap[status as HttpCodes]?.();
  }

  if ('any' in errorMap) {
    return await errorMap['any']?.();
  }
};
