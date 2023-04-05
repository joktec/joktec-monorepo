export interface IResponseDto<T = any> {
  timestamp: Date;
  success: boolean;
  errorCode?: number;
  message?: string;
  data?: T;

  error?: any;
  path?: string;
  method?: string;
  body?: any;
  params?: any;
  query?: any;
}
