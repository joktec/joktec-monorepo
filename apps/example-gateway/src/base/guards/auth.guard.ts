import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  JwtService,
  Reflector,
  UnauthorizedException,
} from '@joktec/core';
import moment from 'moment';
import { SessionService } from '../../modules/sessions';
import { SessionStatus } from '../../modules/sessions/models';
import { UserService } from '../../modules/users';
import { UserStatus } from '../../modules/users/models';
import { Request } from '../models';

@Injectable()
export class AuthGuard implements CanActivate {
  public static SKIP_KEY = 'SKIP_AUTH_GUARD';

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.reflector.getAllAndOverride<boolean>(AuthGuard.SKIP_KEY, [context.getHandler(), context.getClass()]);

    const req = context.switchToHttp().getRequest<Request>();
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
    return true;
  }
}

// export const Roles = () => SetMetadata(RoleGuard.ROLES_KEY, roles);
