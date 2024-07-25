import { CacheService, CacheTtlSeconds } from '@joktec/cacher';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  JwtService,
  UnauthorizedException,
} from '@joktec/core';
import moment from 'moment';
import { AUTH_GUARD_NAMESPACE, IRequest } from '../../app.constant';
import { SessionStatus, UserStatus } from '../../models/constants';
import { Session, User } from '../../models/entities';
import { SessionRepo, UserRepo } from '../../repositories';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private sessionRepo: SessionRepo,
    private userRepo: UserRepo,
    private cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IRequest>();
    const token = await this.jwtService.extractToken(req);
    const payload = await this.jwtService.verify(token);

    let session: Session, loggedUser: User;

    const cachedData = await this.cacheService.get(payload.jti, { namespace: AUTH_GUARD_NAMESPACE });
    if (cachedData) {
      session = cachedData.session;
      loggedUser = cachedData.loggedUser;
    }

    if (!session || !loggedUser) {
      [session, loggedUser] = await Promise.all([
        this.sessionRepo.findByTokenId(payload.jti),
        this.userRepo.findById(payload.sub),
      ]);
    }

    if (!session || moment().isSameOrAfter(session?.expiresAt) || session.status === SessionStatus.DISABLED) {
      throw new UnauthorizedException('SESSION_EXPIRED');
    }
    if (!loggedUser) throw new UnauthorizedException('USER_NOT_FOUND');
    if (loggedUser.status === UserStatus.PENDING) throw new ForbiddenException('USER_NOT_ACTIVE');
    if (loggedUser.status === UserStatus.DISABLED) throw new ForbiddenException('USER_IS_DISABLED');

    this.cacheService
      .set(payload.jti, { session, loggedUser }, { namespace: AUTH_GUARD_NAMESPACE, expiry: CacheTtlSeconds.ONE_DAY })
      .catch();

    req.payload = payload;
    req.loggedUser = loggedUser;
    return true;
  }
}
