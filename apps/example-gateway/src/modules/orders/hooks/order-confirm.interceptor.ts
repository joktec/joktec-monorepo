import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@joktec/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Request } from '../../../base';
import { RoomService } from '../../rooms';
import { Order, OrderStatus } from '../models';
import { OrderService } from '../order.service';

@Injectable()
export class OrderConfirmInterceptor implements NestInterceptor {
  constructor(
    private orderService: OrderService,
    private roomService: RoomService,
  ) {}

  /**
   * Verify status of current other, if pass validate and update success, add one line schedule to Room
   * @param context
   * @param next
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request<Order>>();

    const order = await this.orderService.findOne(req.params.id);
    if (!order) return next.handle();
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('ORDER_CAN_NOT_CONFIRM');
    }

    req.body = {
      status: OrderStatus.CONFIRMED,
      $push: {
        timelines: {
          $each: [{ title: `The booking has been confirmed by admin ${req.loggedUser.fullName}` }],
          $position: 0,
        },
      },
    };

    return next.handle().pipe(
      catchError(err => throwError(() => err)),
      mergeMap(async (newOrder: Order) => {
        const [fromDate, toDate] = newOrder.bookingTime;
        const roomUpdate: any = {
          $push: {
            schedules: {
              $each: [{ orderId: newOrder._id, fromDate, toDate }],
              $position: 0,
            },
          },
        };
        await this.roomService.update(String(newOrder.roomId), { ...roomUpdate });
        return newOrder;
      }),
    );
  }
}
