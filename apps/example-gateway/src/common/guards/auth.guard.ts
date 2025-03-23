import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  JwtService,
  UnauthorizedException,
} from '@joktec/core';
import dayjs from 'dayjs';
import { I18nContext } from 'nestjs-i18n';
import { IRequest } from '../../app.constant';
import { SessionStatus, UserStatus } from '../../models/constants';
import { SessionRepo, UserRepo } from '../../repositories';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private sessionRepo: SessionRepo,
    private userRepo: UserRepo,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequest>();
    const token = await this.jwtService.extractToken(req);
    req.payload = await this.jwtService.verify(token);

    const [session, loggedUser] = await Promise.all([
      this.sessionRepo.findByPayload(req.payload),
      this.userRepo.findByPayload(req.payload),
    ]);

    if (!session || dayjs().isSameOrAfter(session?.expiresAt) || session.status === SessionStatus.DISABLED) {
      throw new UnauthorizedException('auth.SESSION_EXPIRED');
    }
    if (!loggedUser) throw new UnauthorizedException('user.USER_NOT_FOUND');
    if (loggedUser.status === UserStatus.PENDING) throw new ForbiddenException('user.USER_NOT_ACTIVE');
    if (loggedUser.status === UserStatus.DISABLED) throw new ForbiddenException('user.USER_DISABLED');

    req.loggedUser = loggedUser;
    req.session = session;
    req.locale = I18nContext.current(context)?.lang || loggedUser.config.language;
    req.timezone = req.header('accept-timezone') || loggedUser.config.timezone;
    return true;
  }
}
