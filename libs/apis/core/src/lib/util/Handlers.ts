import { AxiosResponse } from "axios";

type HttpCodes = 200 | 201 | 204 | 400 | 404 | 405 | 409 | 415 | 'any';

type StatusHandler = () => void;
type HandleMap = Record<HttpCodes, StatusHandler>;

export const handleResponse = <T>(
  response: AxiosResponse<T>,
  errorMap: Partial<HandleMap>
) => {

  const status = response.status;

  if (status in errorMap) {
    return errorMap[status as HttpCodes]?.();
  }

  if ('any' in errorMap) {
    return errorMap['any']?.();
  }
};