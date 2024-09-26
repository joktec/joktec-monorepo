import { Agent } from 'http';
import { AxiosRequestConfig } from 'axios';
import { IAxiosRetryConfig } from 'axios-retry';
import { HttpProxyConfig } from '../http.config';

/**
 * Custom HTTP request configuration that extends AxiosRequestConfig.
 * For more details, see the official Axios documentation: https://axios-http.com/docs/req_config
 */
export interface HttpRequest extends AxiosRequestConfig {
  /**
   * Proxy configuration for the HTTP request.
   * Follows the structure of Axios's proxy settings.
   */
  proxy?: HttpProxyConfig;
  /**
   * Custom HTTP agent configuration.
   * You can use the method `this.httpService.buildAgent(args)` to create the agent properly.
   */
  httpAgent?: Agent;
  /**
   * Custom HTTPS agent configuration.
   * You can use the method `this.httpService.buildAgent(args)` to create the agent properly.
   */
  httpsAgent?: Agent;
  /**
   * Enables or disables query parameter serialization before sending the request.
   * Defaults to `false`.
   */
  serializer?: boolean;
  /**
   * Prints the request in cURL format for debugging purposes.
   * Defaults to `false`.
   */
  curlirize?: boolean;
  /**
   * Defines how to handle the response when the status code falls outside the 2xx range.
   * Defaults to returning the `response`.
   * - 'response': Returns the full Axios response object.
   * - 'throw': Throws an error for non-2xx status codes.
   */
  onFailReturn?: 'response' | 'throw';
  /**
   * Custom configuration for retrying a failed request.
   * For more details, see: https://www.npmjs.com/package/axios-retry
   */
  axiosRetry?: IAxiosRetryConfig;
  /**
   * Allows for additional properties as per your custom configuration needs.
   */
  [key: string]: any;
}

/**
 * Custom HTTP request configuration for form data submissions.
 * Extends the base HttpRequest interface.
 */
export interface HttpFormRequest extends HttpRequest {
  /**
   * Form data to be sent with the request.
   * Supports key-value pairs where values can be strings, numbers, booleans, files, buffers,
   * or arrays of files or buffers.
   */
  formData: {
    [key: string]: string | number | boolean | File | Buffer | Array<File> | Array<Buffer>;
  };
}
