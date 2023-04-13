import { AxiosResponse } from 'axios';

export interface HttpResponse<T> extends AxiosResponse<T, any> {}
