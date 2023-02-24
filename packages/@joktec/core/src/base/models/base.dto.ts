export interface IResponseDto<T = any> {
  timestamp: Date;
  status: boolean;
  code?: number;
  message?: string;
  path?: string;
  method?: string;
  body?: object;
  params?: object;
  query?: object;
  data?: T;
  error?: T | Array<T>;
}
