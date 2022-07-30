import { OnBadRequest, OnNotFound } from "../handlers";

export interface UpdateCustomerRequest extends OnBadRequest, OnNotFound {
  readonly name: string;
  readonly surname: string;
}