import { ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export abstract class BaseGuard implements CanActivate {
  protected readonly jwtService: JwtService;

  protected constructor() {
    this.jwtService = new JwtService();
  }

  protected getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const headers = context.switchToHttp().getRequest().headers;
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
