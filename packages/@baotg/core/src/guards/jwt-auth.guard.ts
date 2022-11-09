import { ExecutionContext, Injectable, ForbiddenException, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  readonly jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const headers = context.switchToHttp().getRequest().headers;

      if (!headers.authorization) return false;

      const [prefix, token] = headers.authorization.split(' ');
      if (prefix !== 'Bearer') return false;

      const secret = Buffer.from(`${process.env.JWT_TOKEN_SECRET}`, 'base64');

      const decode: any = await this.jwtService.verify(token, {
        secret,
      });

      if (!decode) return false;

      const request = context.switchToHttp().getRequest();
      request.user = {
        token,
        id: decode.userId || decode.sub,
        email: decode.email,
        organization: decode.organizationId,
      };

      return true;
    } catch (err) {
      console.error('@err', err);
      return false;
    }
  }
}
