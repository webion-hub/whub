import { AxiosResponse } from "axios";
import { ProblemDetails } from "./responses/problem-details";
import StatusCode from "./status-code";

export type ResponseHandlers = {
  onBadRequest?(problem?: ProblemDetails): void;
  onProblem?(problem?: ProblemDetails): void;
  onNotFound?(problem?: ProblemDetails): void;
};

export function handleErrors<T>(
  response: AxiosResponse<T>,
  handlers: ResponseHandlers
): AxiosResponse<T> | never
{
  const status = response.status;
  if (!StatusCode.isError(status)) {
    return response;
  }

  const handler = {
    400: handlers.onBadRequest,
    404: handlers.onNotFound,
    500: handlers.onProblem,
  } [response.status];

  handler?.(response.data);
  const err =
    StatusCode.isClientError(status) ? 'Client error' :
    StatusCode.isServerError(status) ? 'Server error' :
    'Unknown error';

  throw new Error(err);
}