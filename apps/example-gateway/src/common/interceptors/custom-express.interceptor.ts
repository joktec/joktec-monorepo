import {
  CallHandler,
  ExecutionContext,
  ExpressInterceptor,
  ExpressResponseType,
  Injectable,
  instanceToPlain,
  IResponseDto,
} from '@joktec/core';
import { IMongoRequest, ObjectId } from '@joktec/mongo';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { DEFAULT_LOCALE, IRequest } from '../../app.constant';
import { I18nGroup } from '../../models/common';

@Injectable()
export class CustomExpressInterceptor<T = any> extends ExpressInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<IRequest>();

    if (req.payload) {
      const payload = req.payload;
      if (req.body && req.method === 'POST') {
        Object.assign(req.body, { authorId: ObjectId.create(payload.sub) });
      }
    }

    return super.intercept(context, next);
  }

  /**
   * Override transformQuery to get language from I18nContext
   * @param req
   */
  transformQuery(req: IRequest): IMongoRequest<any> {
    const query = super.transformQuery(req);
    if (!req.query.language) {
      query.language = I18nContext.current().lang || DEFAULT_LOCALE;
    }
    return query;
  }

  /**
   * Override transformData to return the final output for client
   * @param data
   */
  transformData(data: T): ExpressResponseType<T> {
    if (typeof data === 'object') {
      return {
        timestamp: new Date(),
        success: true,
        errorCode: 0,
        message: 'Success',
        data: data ? instanceToPlain<T>(data, { groups: [I18nGroup.TRANSLATE] }) : undefined,
      } as IResponseDto<T>;
    }
    return data;
  }
}
