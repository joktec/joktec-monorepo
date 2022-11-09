import { AxiosResponse } from 'axios';

export interface HttpClientResponse<T> extends AxiosResponse<T> {}
