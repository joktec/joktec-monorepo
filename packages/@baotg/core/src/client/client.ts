import { ClientConfig } from './client.config';

export interface Client<Config extends ClientConfig, Client = any> {
  getConfig(conId: string): Config;

  getClient(conId: string): Client;
}
