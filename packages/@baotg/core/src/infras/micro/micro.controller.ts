import { UseInterceptors, Controller } from '@nestjs/common';
import { GrpcMethod as CMicroMethod } from '@nestjs/microservices';
import { MicroPromInterceptor } from './micro-prom.interceptor';

export const MicroController = (opts?: { metric: boolean }) => {
  return Clazz => {
    const metric = opts?.metric ?? true;
    if (metric) Clazz = UseInterceptors(MicroPromInterceptor)(Clazz);
    Controller()(Clazz);
  };
};

export const MicroMethod = () => {
  return (target: any, method: string, descriptor?: any) => {
    return CMicroMethod(target.constructor.serviceName, method)(target, method, descriptor) as any;
  };
};
