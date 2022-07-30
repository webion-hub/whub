import { AxiosResponse } from "axios";
import { ProblemDetails } from "./problem-details";

export type Response<T> = Promise<AxiosResponse<T>>;
export type EmptyResponse = Response<void>;
export type ResponseHandlers = {
  onProblem?(problem?: ProblemDetails | string): void;
  onBadRequest?(problem?: ProblemDetails): void;
  onNotFound?(problem?: ProblemDetails): void;
}


export function handleErrors<T>(
  response: AxiosResponse<T>,
  handlers: ResponseHandlers
): AxiosResponse<T> {
  const handler = {
    400: handlers.onBadRequest,
    404: handlers.onNotFound,
    500: handlers.onProblem,
  } [response.status];

  if (handler === undefined) {
    return response;
  }

  handler(response.data);
  throw new Error('Request returned an error');
}
