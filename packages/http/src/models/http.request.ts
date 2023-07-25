import { AxiosProxyConfig, AxiosRequestConfig } from 'axios';

export type HttpProxy = AxiosProxyConfig | false;

export interface HttpRequest extends AxiosRequestConfig {
  proxy?: HttpProxy;
  serializer?: boolean;
}

export interface HttpFormData {
  formData: {
    [key: string]: string | number | boolean | File | Buffer | Array<File> | Array<Buffer>;
  };
}
