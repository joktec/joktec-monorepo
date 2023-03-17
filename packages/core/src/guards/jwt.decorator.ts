import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtContext } from './jwt.config';
import { JwtUser } from './jwt.model';

export const LoggedUser = <T extends JwtUser>(context: JwtContext = JwtContext.HTTP): ParameterDecorator => {
  if (context === JwtContext.HTTP) {
    return createParamDecorator((data: unknown, ctx: ExecutionContext): T => {
      const req = ctx.switchToHttp().getRequest();
      return req.loggedUser as T;
    });
  }

  return createParamDecorator((data: unknown, context: ExecutionContext): T => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.loggedUser;
  });
};
