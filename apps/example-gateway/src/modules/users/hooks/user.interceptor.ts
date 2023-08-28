import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle();
  }
}
