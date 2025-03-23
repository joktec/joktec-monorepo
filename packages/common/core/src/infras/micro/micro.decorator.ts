import { GrpcMethod } from '@nestjs/microservices';

export const MicroMethod = (serviceName?: string, methodName?: string) => {
  return (target: any, method: string, descriptor?: any) => {
    return GrpcMethod(serviceName || target.constructor.serviceName, methodName || method)(
      target,
      method,
      descriptor,
    ) as any;
  };
};
