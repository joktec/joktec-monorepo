import { createParamDecorator, ExecutionContext } from '@joktec/core';
import { IRequest } from '../../app.constant';

export const Instances = createParamDecorator<any, any[]>((data: any, ctx: ExecutionContext): any[] => {
  const req = ctx.switchToHttp().getRequest<IRequest>();
  return req.instances;
});
