import { CallHandler, ExecutionContext, Injectable, ExpressInterceptor } from '@joktec/core';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { IRequest } from '../../app.constant';

@Injectable()
export class CustomExpressInterceptor extends ExpressInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<IRequest>();
    if (!req.query.language) {
      req.query.language = I18nContext.current().lang || '*';
    }

    if (req.payload) {
      const payload = req.payload;

      if (req.body && req.method === 'POST') {
        Object.assign(req.body, { createdBy: payload.sub, updatedBy: payload.sub });
      }

      if (req.body && (req.method === 'PUT' || req.method === 'PATCH')) {
        Object.assign(req.body, { updatedBy: payload.sub });
      }
    }

    return super.intercept(context, next);
  }
}
