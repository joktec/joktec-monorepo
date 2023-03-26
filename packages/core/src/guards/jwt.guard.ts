import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.jwtService.extractToken(request);
    request.payload = await this.jwtService.verify(token);
    return true;
  }
}
