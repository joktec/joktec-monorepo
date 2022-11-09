import { UseInterceptors, Controller } from '@nestjs/common';
import { GatewayPromInterceptor } from './gateway-prom.interceptor';

export const GatewayController = (prefix: string, opts?: { metric: boolean }) => {
  return Clazz => {
    const metric = opts?.metric ?? true;
    if (metric) Clazz = UseInterceptors(GatewayPromInterceptor)(Clazz);
    Controller(prefix)(Clazz);
  };
};
