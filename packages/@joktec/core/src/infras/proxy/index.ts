import { ClientProviderOptions } from '@nestjs/microservices';
import { ConfigService, initConfig } from '../../config';
import { ProxyConfig } from './proxy.config';

export const createClientProviders = (...services: string[]): ClientProviderOptions[] => {
  const cfgService = new ConfigService(initConfig());
  const raw = cfgService.get<ProxyConfig>('proxies');
  if (!raw) return [];
  const proxyConfig: ProxyConfig = new ProxyConfig(raw);
  return proxyConfig.getProviders(...services);
};
