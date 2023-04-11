import { UnauthorizedException } from '../exceptions';

export class JwtException extends UnauthorizedException {
  constructor(message: string, data: any = null) {
    super(message, data);
  }
}
