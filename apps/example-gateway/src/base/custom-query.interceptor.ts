import { CallHandler, ExecutionContext, Injectable, NestInterceptor, QueryInterceptor } from '@joktec/core';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { IRequest } from '../app.constant';

@Injectable()
export class CustomQueryInterceptor extends QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<IRequest>();
    if (!req.query.language) {
      req.query.language = I18nContext.current().lang || '*';
    }
    return super.intercept(context, next);
  }
}
