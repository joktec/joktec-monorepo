import { CallHandler, ExecutionContext, ICondition, Injectable, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';
import { IRequest } from '../../../app.constant';
import { Session } from '../../../models/entities';

@Injectable()
export class SessionQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<IRequest<Session>>();
    req.query.condition = {
      ...req.query.condition,
      userId: req.loggedUser._id,
      tokenId: { $ne: req.payload.jti },
    } as ICondition<Session>;
    return next.handle();
  }
}
