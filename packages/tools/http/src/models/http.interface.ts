import { HttpMethod } from '@joktec/utils';

/**
 * Configuration options for retrying failed HTTP requests.
 */
export interface IHttpRetryConfig {
  /**
   * The number of times to retry the request before considering it a failure.
   *
   * @default 3
   */
  retries?: number;
  /**
   * Specifies whether the request timeout should be reset between retry attempts.
   *
   * @default false
   */
  shouldResetTimeout?: boolean;
  /**
   * The delay in milliseconds between retry attempts.
   *
   * @default 1000
   */
  retryDelay?: number;
  /**
   * An array of HTTP methods that should trigger a retry if the request fails.
   * If not specified, it defaults to common methods like GET, POST, etc.
   */
  httpMethodsToRetry?: HttpMethod[];
  /**
   * An array of status code ranges (in the form of [min, max]) that should trigger a retry.
   * For example, [[500, 599]] would retry on any server errors (500-599).
   */
  statusCodesToRetry?: number[][];
}
