export interface IResponseDto<T = any> {
  timestamp: Date;
  success: boolean;
  status?: number;
  message?: string;
  data?: T;

  error?: any;
  path?: string;
  method?: string;
  body?: object;
  params?: object;
  query?: object;
}
