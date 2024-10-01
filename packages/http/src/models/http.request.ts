import { Agent } from 'http';
import { AxiosRequestConfig } from 'axios';
import { IAxiosRetryConfig } from 'axios-retry';
import { HttpProxyConfig } from '../http.config';
import { HttpResponse } from './http.response';

/**
 * Custom HTTP request configuration that extends AxiosRequestConfig.
 * For more details, see the official Axios documentation: https://axios-http.com/docs/req_config
 */
export interface HttpRequest<DATA = any> extends AxiosRequestConfig<DATA> {
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
   *
   * - `'response'`: The response object is returned, even if the status code is outside the 2xx range.
   * - `'throw'`: An error is thrown for any non-2xx status code.
   * - `function(res: HttpResponse<D>): boolean | Promise<boolean>`: A custom function that takes in the response object.
   *     If it returns `true`, the response is considered valid and returned.
   *     If it returns `false`, an exception is thrown.
   *
   * @example
   * validateResponse: (res: HttpResponse<any>): boolean => {
   *   // Return the response for all non-server errors (status code below 500) and if `res.data` is object
   *   return typeof res.data === 'object' && res.status < 500;
   * }
   *
   * @type {'response' | 'throw' | (res: HttpResponse) => boolean | Promise<boolean>}
   */
  validateResponse?: 'response' | 'throw' | ((res: HttpResponse<DATA>) => boolean | Promise<boolean>);
  /**
   * Custom configuration for retrying a failed request.
   * For more details, see: https://www.npmjs.com/package/axios-retry
   */
  'axios-retry'?: IAxiosRetryConfig;

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
