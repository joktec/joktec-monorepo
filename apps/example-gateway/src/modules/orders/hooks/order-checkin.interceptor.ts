import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@joktec/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Request } from '../../../base';
import { Order, OrderStatus } from '../models';
import { OrderService } from '../order.service';

@Injectable()
export class OrderCheckinInterceptor implements NestInterceptor {
  constructor(private orderService: OrderService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request<Order>>();

    const order = await this.orderService.findOne(req.params.id);
    if (!order) return next.handle();
    if (order.status !== OrderStatus.CONFIRMED) {
      throw new BadRequestException('ORDER_HAVE_NOT_CONFIRMED');
    }

    const now = moment();
    req.body = {
      status: OrderStatus.PROCESSING,
      checkinTime: now.toDate(),
      $push: {
        timelines: {
          $each: [{ title: `User ${req.loggedUser.fullName} has been checkin at ${now.toISOString()}` }],
          $position: 0,
        },
      },
    };

    return next.handle();
  }
}
