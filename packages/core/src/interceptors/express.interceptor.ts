import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { lookup } from 'geoip-lite';
import { head, isEmpty, uniq } from 'lodash';
import requestIp from 'request-ip';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import UAParser from 'ua-parser-js';
import { ExpressRequest, ExpressResponse, GeoIp, IBaseRequest, IResponseDto, IUserAgent } from '../models';
import { nullKeysToObject, toInt } from '../utils';

export type ExpressResponseType<T> = string | T | IResponseDto<T>;

@Injectable()
export class ExpressInterceptor<T = any> implements NestInterceptor<T, ExpressResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<ExpressRequest<T>>();
    const res = context.switchToHttp().getResponse<ExpressResponse<T>>();

    this.backupQuery(req, res);
    this.injectRequest(req);

    return next.handle().pipe(
      map((data: T) => this.transformResponse(data)),
      catchError(err => this.handleError(err)),
    );
  }

  /**
   * Backup request information for later use
   */
  protected backupQuery(req: ExpressRequest, res: ExpressResponse) {
    res.locals.query = req.query;
    res.locals.body = req.body;
    res.locals.params = req.params;
  }

  /**
   * Inject headers and custom attributes
   */
  protected injectRequest(req: ExpressRequest) {
    req.locale = this.resolverLanguage(req);
    req.timezone = this.resolverTimezone(req);
    req.userAgent = this.resolverUserAgent(req);
    req.geoIp = this.resolverGeoIP(req);
    req.query = this.resolverQuery(req);
  }

  protected resolverLanguage(req: ExpressRequest): string {
    if (!req.headers['accept-language']) return null;
    const acceptLanguage: string = req.headers['accept-language'] as string;
    const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;
    const strings = acceptLanguage.match(regex);
    const languages = strings
      .filter(m => !isEmpty(m))
      .map(m => {
        const bits = m.split(';');
        const ietf = bits[0].split('-');
        const hasScript = ietf.length === 3;
        return {
          code: ietf[0],
          script: hasScript ? ietf[1] : null,
          region: hasScript ? ietf[2] : ietf[1],
          quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
        };
      })
      .filter(r => r)
      .sort((a, b) => b.quality - a.quality)
      .map(lang => lang.code);
    return head(uniq(languages));
  }

  protected resolverTimezone(req: ExpressRequest): string {
    return !req.headers['accept-timezone'] ? 'UTC' : (req.headers['accept-timezone'] as string);
  }

  protected resolverUserAgent(req: ExpressRequest): IUserAgent {
    if (!req.headers['user-agent']) return null;
    return new UAParser(req.headers['user-agent'] as string).getResult();
  }

  protected resolverGeoIP(req: ExpressRequest): GeoIp {
    const ipAddress = requestIp.getClientIp(req);
    return { ipAddress, ...lookup(ipAddress) };
  }

  /**
   * Transform and normalize query parameters
   */
  protected resolverQuery(req: ExpressRequest): IBaseRequest<any> {
    const page = toInt(req.query?.page, 1);
    const limit = toInt(req.query?.limit, 20);
    const offset = toInt(req.query?.offset, (page - 1) * limit);

    const query: IBaseRequest<any> = {
      ...req.query,
      condition: nullKeysToObject(req.query?.condition || {}),
      sort: req.query?.sort || {},
      page,
      limit,
      offset,
      language: req.query?.language || req.locale || '*',
    };

    if (req.query?.offset) delete query.page;
    return query;
  }

  /**
   * Transform response data into a standard format
   */
  protected transformResponse(data: T): ExpressResponseType<T> {
    if (typeof data === 'object') {
      return {
        timestamp: new Date(),
        success: true,
        errorCode: 0,
        message: 'Success',
        data: data ? instanceToPlain<T>(data) : undefined,
      } as IResponseDto<T>;
    }
    return data;
  }

  /**
   * Handle errors and format them if necessary
   */
  protected handleError(err: any): Observable<any> {
    return throwError(() => err);
  }
}
