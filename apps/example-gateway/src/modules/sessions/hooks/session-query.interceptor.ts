import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ExpressRequest } from '@joktec/core';
import { Observable } from 'rxjs';
import { User } from '../../users';

@Injectable()
export class SessionQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest<any, User>>();
    req.query.condition = {
      ...req.query.condition,
      userId: req.loggedUser._id,
      tokenId: { $ne: req.payload.jti },
    };
    return next.handle();
  }
}
