import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@joktec/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models';
import { UserRepo } from '../user.repo';

@Injectable()
export class UserGrantInterceptor implements NestInterceptor {
  constructor(private userRepo: UserRepo) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const loggedUser = req.loggedUser;
    if (loggedUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('PERMISSION_DENIED');
    }

    const userId = req.params.id;
    const user = await this.userRepo.findOne({ condition: { id: userId } });
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    if (user.role === UserRole.ADMIN) throw new BadRequestException('ACCOUNT_IS_ADMIN');
    req.body = { ...req.body, role: UserRole.ADMIN };
    return next.handle();
  }
}
