import {
  ForbiddenException,
  Injectable,
  JwtPayload,
  JwtService,
  NestMiddleware,
  NextFunction,
  Request,
  Response,
  UnauthorizedException,
} from '@joktec/core';
import moment from 'moment';
import { SessionService, SessionStatus } from '../modules/sessions';
import { UserService, UserStatus } from '../modules/users';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = await this.jwtService.extractToken(req);
    const payload: JwtPayload = await this.jwtService.verify(token);
    req['payload'] = payload;

    const [session, loggedUser] = await Promise.all([
      this.sessionService.findByTokenId(payload.jti),
      this.userService.findById(payload.sub),
    ]);

    if (!session || moment().isSameOrAfter(session?.expiresAt) || session.status === SessionStatus.DISABLED) {
      throw new UnauthorizedException('SESSION_EXPIRED');
    }
    if (!loggedUser) throw new UnauthorizedException('USER_NOT_FOUND');
    if (loggedUser.status === UserStatus.PENDING) throw new ForbiddenException('USER_NOT_ACTIVE');
    if (loggedUser.status === UserStatus.DISABLED) throw new ForbiddenException('USER_IS_DISABLED');

    req['loggedUser'] = loggedUser;
    next();
  }
}
