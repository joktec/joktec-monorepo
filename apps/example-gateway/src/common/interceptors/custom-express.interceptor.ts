import { CallHandler, ExecutionContext, Injectable, ExpressInterceptor, IBaseRequest } from '@joktec/core';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { IRequest } from '../../app.constant';

@Injectable()
export class CustomExpressInterceptor extends ExpressInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<IRequest>();

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

  /**
   * Override transformQuery to get language from I18nContext
   * @param req
   */
  transformQuery(req: IRequest): IBaseRequest<any> {
    const query = super.transformQuery(req);
    if (!req.query.language) {
      query.language = I18nContext.current().lang || '*';
    }
    return query;
  }
}
