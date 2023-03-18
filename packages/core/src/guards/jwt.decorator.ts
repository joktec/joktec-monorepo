import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtContext } from './jwt.config';
import { JwtPayload, JwtUser } from './jwt.model';
import { ExceptionMessage, UnauthorizedException } from '../exceptions';

export const Payload = <T extends JwtPayload>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest();
      if (!req.payload) throw new UnauthorizedException(ExceptionMessage.INVALID_PAYLOAD);
      return req.payload as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const payload = ctx.getContext().req.payload as T;
    if (!payload) throw new UnauthorizedException(ExceptionMessage.INVALID_PAYLOAD);
    return payload;
  });
};

export const LoggedUser = <T extends JwtUser>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest();
      if (!req.loggedUser) throw new UnauthorizedException(ExceptionMessage.INVALID_ACCOUNT);
      return req.loggedUser as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const loggedUser = ctx.getContext().req.loggedUser as T;
    if (!loggedUser) throw new UnauthorizedException(ExceptionMessage.INVALID_ACCOUNT);
    return loggedUser;
  });
};
