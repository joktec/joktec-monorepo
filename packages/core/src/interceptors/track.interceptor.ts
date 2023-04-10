import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import useragent from 'express-useragent';

export interface ClientInfo {
  userAgent: string;
  ipAddress: string;
  browser: string;
  version: string;
  os: string;
  platform: string;
  geoIp: { [key: string]: any };
}

@Injectable()
export class TrackInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let ipAddress = request.connection.remoteAddress;
    const xForwardedFor = request.headers['x-forwarded-for'];
    if (xForwardedFor) ipAddress = xForwardedFor.split(',')[0];

    const userAgent = request.headers['user-agent'];
    const ua = useragent.parse(userAgent);
    request.clientInfo = {
      userAgent,
      ipAddress,
      browser: ua.browser,
      version: ua.version,
      os: ua.os,
      platform: ua.platform,
      geoIp: ua.geoIp,
    } as ClientInfo;

    return next.handle();
  }
}
