import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '../exceptions';
import { JwtService } from './jwt.service';
import { JwtPayload } from './jwt.model';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new BadRequestException('AUTHORIZATION_HEADER_NOT_FOUND');
    }

    const [prefix, token] = authHeader.split(' ');
    if (prefix !== 'Bearer' || !token) {
      throw new BadRequestException('INVALID_TOKEN_FORMAT');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verify(token);
      request.loggedUser = {
        token,
        id: payload.userId || payload.sub,
        email: payload.email,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }
  }
}
