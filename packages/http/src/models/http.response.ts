import { Agent } from 'http';
import { AxiosResponse } from 'axios';

export interface HttpResponse<T> extends AxiosResponse<T, any> {}

export type HttpAgent = { httpAgent?: Agent; httpsAgent?: Agent };
