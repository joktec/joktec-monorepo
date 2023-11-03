import { CallHandler, ExecutionContext, Injectable, LogService, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';
import { Request } from '../../../base';
import { Category } from '../models';

@Injectable()
export class CategoryInterceptor implements NestInterceptor {
  constructor(private logger: LogService) {
    this.logger.setContext(CategoryInterceptor.name);
  }

  /**
   * Verify status of current other, if pass validate and update success. Remove the schedule of rooms
   * @param context
   * @param next
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request<Category>>();
    this.logger.info('Example: %j', req.loggedUser);
    return next.handle();
  }
}
