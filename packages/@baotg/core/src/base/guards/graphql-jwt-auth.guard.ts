import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlJwtAuthGuard implements CanActivate {
  readonly jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const headers = this.getRequest(context).headers;
      if (!headers.authorization) return false;

      const [prefix, token] = headers.authorization.split(' ');
      if (prefix !== 'Bearer') return false;

      const secret = Buffer.from(`${process.env.JWT_TOKEN_SECRET}`, 'base64');
      const decode: any = await this.jwtService.verify(token, { secret });
      if (!decode) return false;

      const request = this.getRequest(context);
      request.user = {
        token,
        id: decode.userId || decode.sub,
        email: decode.email,
        organization: decode.organizationId,
      };

      return true;
    } catch (err) {
      return false;
    }
  }
}
