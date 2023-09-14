import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ExpressRequest,
  Injectable,
  NestInterceptor,
} from '@joktec/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { User } from '../../users';
import { OrderStatus } from '../models';
import { OrderService } from '../order.service';

@Injectable()
export class OrderCheckoutInterceptor implements NestInterceptor {
  constructor(private orderService: OrderService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<ExpressRequest<any, User>>();

    const order = await this.orderService.findOne(req.params.id);
    if (!order) return next.handle();
    if (order.status !== OrderStatus.PROCESSING) {
      throw new BadRequestException('ORDER_MUST_BE_CHECKIN_BEFORE');
    }

    const now = moment();
    req.body = {
      status: OrderStatus.COMPLETE,
      checkoutTime: now.toDate(),
      $push: {
        timelines: {
          $each: [{ title: `User ${req.loggedUser.fullName} has been checkout at ${now.toISOString()}` }],
          $position: 0,
        },
      },
    };

    return next.handle();
  }
}
