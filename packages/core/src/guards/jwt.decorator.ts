import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtContext } from './jwt.config';
import { JwtPayload } from './jwt.model';
import { ExceptionMessage } from '../exceptions';
import { JwtException } from './jwt.exception';

export const Payload = <T extends JwtPayload>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest();
      if (!req.payload) throw new JwtException(ExceptionMessage.INVALID_PAYLOAD);
      return req.payload as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const payload = ctx.getContext().req.payload;
    if (!payload) throw new JwtException(ExceptionMessage.INVALID_PAYLOAD);
    return payload as T;
  });
};

export const LoggedUser = <T>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest();
      return req.loggedUser as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    const loggedUser = ctx.getContext().req.loggedUser;
    return loggedUser as T;
  });
};
