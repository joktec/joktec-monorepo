import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExceptionMessage, UnauthorizedException } from '../exceptions';
import { JwtService } from './jwt.service';
import { JwtPayload } from './jwt.model';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(ExceptionMessage.AUTHORIZATION_HEADER_NOT_FOUND);
    }

    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer' || !token) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN_FORMAT);
    }

    try {
      const payload: JwtPayload = await this.jwtService.verify(token);
      request.payload = { ...payload, userId: payload.userId || payload.sub } as JwtPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN);
    }
  }
}
