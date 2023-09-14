import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExpressRequest } from '../base';
import { ExceptionMessage, UnauthorizedException } from '../exceptions';
import { JwtContext } from './jwt.config';
import { JwtPayload } from './jwt.model';

export const JwtPayloadData = <T = JwtPayload>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest<ExpressRequest>();
      if (!req.payload) throw new UnauthorizedException(ExceptionMessage.INVALID_PAYLOAD);
      return req.payload as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.switchToHttp().getRequest();
    if (!req.payload) throw new UnauthorizedException(ExceptionMessage.INVALID_PAYLOAD);
    return req.payload as T;
  });
};

export const LoggedUser = <T>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest<ExpressRequest<any, T>>();
      return req.loggedUser;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.switchToHttp().getRequest<any>();
    return req.loggedUser as T;
  });
};
