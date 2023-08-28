import { BadRequestException, CallHandler, ExecutionContext, Injectable, isEmpty, NestInterceptor } from '@joktec/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RoomService } from '../../rooms';
import { OrderStatus } from '../models';
import { OrderService } from '../order.service';

@Injectable()
export class OrderRejectInterceptor implements NestInterceptor {
  constructor(
    private orderService: OrderService,
    private roomService: RoomService,
  ) {}

  /**
   * Verify status of current other, if pass validate and update success. Remove the schedule of rooms
   * @param context
   * @param next
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const loggedUser = req.loggedUser;

    const reason = req.body.reason;
    if (isEmpty(reason)) throw new BadRequestException('REASON_REQUIRED');

    const order = await this.orderService.findOne(req.params.id);
    if (!order) throw new BadRequestException('ORDER_NOT_FOUND');
    if (![OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PROCESSING].includes(order.status)) {
      throw new BadRequestException('ORDER_CANNOT_BE_REJECT');
    }

    req.body = {
      rejectReason: reason,
      status: OrderStatus.REJECT,
      $push: {
        timelines: {
          $each: [{ title: `The booking has been rejected by ${loggedUser.fullName} with reason: ${reason}` }],
          $position: 0,
        },
      },
    };

    return next.handle().pipe(
      catchError(err => {
        throw err;
      }),
      map(data => {
        this.roomService.removeSchedule(req.params.id);
        return data;
      }),
    );
  }
}
