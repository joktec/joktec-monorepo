import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Request, JwtPayload } from '@joktec/core';
import { Observable } from 'rxjs';
import { User } from '../../users';

@Injectable()
export class SessionQueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    const payload = req['payload'] as JwtPayload;
    const loggedUser = req['loggedUser'] as User;

    req.query.condition = {
      ...(req.query.condition as any),
      userId: loggedUser._id,
      tokenId: { $ne: payload.jti },
    };

    return next.handle();
  }
}
