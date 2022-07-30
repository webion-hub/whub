import { ProblemDetails } from "./responses/problem-details";

export interface OnProblem {
  onProblem(error?: ProblemDetails | string): void;
}

export interface OnBadRequest {
  onBadRequest(error?: ProblemDetails): void;
}

export interface OnNotFound {
  onNotFound(error?: ProblemDetails): void;
}