import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  JwtService,
  UnauthorizedException,
} from '@joktec/core';
import moment from 'moment';
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
      this.sessionRepo.findByTokenId(req.payload.jti),
      this.userRepo.findById(req.payload.sub),
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
