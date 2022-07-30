export interface ProblemDetails {
  readonly type?: string;
  readonly title?: string;
  readonly status?: number;
  readonly detail?: string;
  readonly instance?: string;

  /**
   * An array of validation errors
   * E.g.
   * "The 'Email' field must be an email"
   */
  readonly errors?: string[];
}