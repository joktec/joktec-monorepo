import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InjectQueue,
  NestInterceptor,
  Queue,
  Request,
} from '@joktec/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../users';

@Injectable()
export class OrderSubmittedInterceptor implements NestInterceptor {
  constructor(@InjectQueue('order') private orderQueue: Queue) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const loggedUser = req['loggedUser'] as User;
    if (loggedUser.role !== UserRole.USER) {
      throw new ForbiddenException();
    }

    try {
      const job = await this.orderQueue.add('validate', { payload: req['payload'], body: req.body }, {});
      req.body = await job.finished();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

    return next.handle();
  }
}
