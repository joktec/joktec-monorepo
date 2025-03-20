import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExpressRequest } from '../../models';
import { JwtContext } from './jwt.config';
import { JwtPayload } from './jwt.model';

export const Jwt = createParamDecorator<JwtContext, JwtPayload>(
  (data: JwtContext, context: ExecutionContext): JwtPayload => {
    const ctx = data === JwtContext.GQL ? GqlExecutionContext.create(context) : context;
    const req = ctx.switchToHttp().getRequest<ExpressRequest>();
    return req.payload;
  },
);

export const LoggedUser = createParamDecorator<JwtContext, any>((data: JwtContext, context: ExecutionContext): any => {
  const ctx = data === JwtContext.GQL ? GqlExecutionContext.create(context) : context;
  const req = ctx.switchToHttp().getRequest<ExpressRequest>();
  return req.loggedUser;
});
