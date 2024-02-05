import { Job, JwtPayload, plainToInstance, Process, Processor, toInt } from '@joktec/core';
import { head } from 'lodash';
import moment from 'moment';
import { OrderStatus, PaymentMethod, RoomStatus } from '../../models/constants';
import { Apartment, Order, Room } from '../../models/entities';
import { RoomService } from '../rooms';
import { OrderService } from './order.service';

const LIMIT_ORDER = 10;

@Processor('order')
export class OrderConsumer {
  constructor(
    private roomService: RoomService,
    private orderService: OrderService,
  ) {}

  @Process('validate')
  async orderTransaction(job: Job<JwtPayload>) {
    const { data } = job;

    const payload = data.payload;
    const orderInput = plainToInstance(Order, data.body);
    const rooms = await this.roomService.find({
      condition: { _id: orderInput.roomId.toString() },
      populate: {
        apartment: '*',
      },
    });

    const room: Room = head(rooms);
    if (!orderInput.roomId || !room) {
      return job.moveToFailed({ message: 'ROOM_REQUIRED' }, true);
    }

    if (room.status !== RoomStatus.ACTIVATED) {
      return job.moveToFailed({ message: 'ROOM_NOT_AVAILABLE' }, true);
    }

    const apartment = plainToInstance(Apartment, room.apartment);
    const [maxOrders, lastOrders] = await Promise.all([
      this.orderService.find({ sort: { sequence: 'desc' } }),
      this.orderService.find({
        sort: { sequence: 'desc' },
        condition: {
          userId: payload.sub,
          type: orderInput.type,
          createdAt: {
            $gte: moment().subtract(1, 'days').toDate(),
          },
        },
      }),
    ]);

    if (lastOrders.length >= LIMIT_ORDER) {
      return job.moveToFailed({ message: 'LIMIT_10_ORDER' }, true);
    }

    const format = 'YYYY-MM-DD';
    const now = moment().startOf('days');
    const [startDate, endDate] = orderInput.bookingTime || [];
    if (!startDate || !endDate) {
      return job.moveToFailed({ message: 'BOOKING_TIME_REQUIRED' }, true);
    }

    const mStartDate = moment(startDate, format);
    const mEndDate = moment(endDate, format);
    if (!mStartDate.isValid() || !mEndDate.isValid()) {
      return job.moveToFailed({ message: 'BOOKING_TIME_INVALID' }, true);
    }

    if (mStartDate.isSameOrBefore(now, 'days')) {
      return job.moveToFailed({ message: 'START_DATE_MUST_AFTER_NOW' }, true);
    }

    if (mStartDate.isSameOrAfter(mEndDate, 'days')) {
      return job.moveToFailed({ message: 'START_DATE_MUST_BEFORE_END_DATE' }, true);
    }

    const availableRooms = await this.roomService.findAvailableRooms(startDate, endDate);
    const isRoomAvailable: boolean = !!availableRooms.find(r => r._id === orderInput.roomId);
    if (!isRoomAvailable) {
      return job.moveToFailed({ message: 'ROOM_NOT_AVAILABLE_IN_TIME_FRAME' }, true);
    }

    const maxOrder = head(maxOrders);
    const sequence: number = toInt(maxOrder?.sequence, 0) + 1;
    const code = `${apartment.code}.${room.code}${sequence.toString().padStart(6, '0')}`;

    return Object.assign(orderInput, {
      code,
      sequence,
      title: `Booking no. #${code}`,
      subhead: `Booking room ${room.code} at ${apartment.title}`,
      serviceFee: room.price,
      paymentMethod: orderInput.paymentMethod || PaymentMethod.COD,
      userId: orderInput.userId || payload.sub,
      status: OrderStatus.PENDING,
      bookingTime: [mStartDate.startOf('days').toDate(), mEndDate.startOf('days').toDate()],
      timelines: [
        { title: 'The booking is waiting for confirmed.' },
        { title: 'The booking have been sent successfully.' },
      ],
    });
  }
}
