import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@joktec/core';
import { Observable } from 'rxjs';
import { Request } from '../../../base';
import { Session } from '../models';

@Injectable()
export class SessionQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request<Session>>();
    req.query.condition = {
      ...req.query.condition,
      userId: req.loggedUser._id,
      tokenId: { $ne: req.payload.jti },
    };
    return next.handle();
  }
}
