import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@joktec/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { IRequest } from '../../../app.constant';
import { OrderStatus } from '../../../models/constants';
import { Order } from '../../../models/entities';
import { OrderService } from '../order.service';

@Injectable()
export class OrderEditableInterceptor implements NestInterceptor {
  constructor(private orderService: OrderService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<IRequest<Order>>();

    const order = await this.orderService.findById(req.params.id);
    if (!order) return next.handle();

    const now = moment().startOf('second');
    const [startTime] = order.bookingTime;

    const allowUpdate: boolean =
      (order.status === OrderStatus.PENDING || order.status === OrderStatus.CONFIRMED) &&
      moment(startTime).isSameOrAfter(now, 'second');

    if (!allowUpdate) {
      throw new BadRequestException('CANNOT_UPDATE_ORDER');
    }

    return next.handle();
  }
}
