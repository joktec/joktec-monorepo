import { Agent } from 'http';
import { AxiosResponse } from 'axios';

export interface HttpResponse<DATA = any, CONFIG = any> extends AxiosResponse<DATA, CONFIG> {}

export type HttpAgent = { httpAgent?: Agent; httpsAgent?: Agent };
