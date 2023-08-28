import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../modules/users';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const loggedUser = req.loggedUser as User;
    if (loggedUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    return next.handle();
  }
}
