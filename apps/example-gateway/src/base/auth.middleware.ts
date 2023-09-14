import {
  ExpressRequest,
  ExpressResponse,
  ForbiddenException,
  Injectable,
  JwtService,
  NestMiddleware,
  NextFunction,
  UnauthorizedException,
} from '@joktec/core';
import moment from 'moment';
import { SessionService, SessionStatus } from '../modules/sessions';
import { User, UserService, UserStatus } from '../modules/users';

@Injectable()
export class AuthMiddleware implements NestMiddleware<ExpressRequest, ExpressResponse> {
  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  async use(req: ExpressRequest<any, User>, res: ExpressResponse, next: NextFunction) {
    const token = await this.jwtService.extractToken(req);
    req.payload = await this.jwtService.verify(token);

    const [session, loggedUser] = await Promise.all([
      this.sessionService.findByTokenId(req.payload.jti),
      this.userService.findById(req.payload.sub),
    ]);

    if (!session || moment().isSameOrAfter(session?.expiresAt) || session.status === SessionStatus.DISABLED) {
      throw new UnauthorizedException('SESSION_EXPIRED');
    }
    if (!loggedUser) throw new UnauthorizedException('USER_NOT_FOUND');
    if (loggedUser.status === UserStatus.PENDING) throw new ForbiddenException('USER_NOT_ACTIVE');
    if (loggedUser.status === UserStatus.DISABLED) throw new ForbiddenException('USER_IS_DISABLED');

    req.loggedUser = loggedUser;
    next();
  }
}
