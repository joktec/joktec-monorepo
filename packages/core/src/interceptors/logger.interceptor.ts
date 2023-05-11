import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from '../log';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    this.logger.info('Request [%s] \t %s %s', req.method, req.originUrl);
    return next.handle();
  }
}
