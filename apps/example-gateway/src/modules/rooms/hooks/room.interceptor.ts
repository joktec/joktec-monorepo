import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  IBaseRequest,
  ICondition,
  Injectable,
  NestInterceptor,
  ValidateException,
} from '@joktec/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Room, RoomStatus } from '../models';
import { RoomRepo } from '../room.repo';

@Injectable()
export class RoomInterceptor implements NestInterceptor {
  constructor(private roomRepo: RoomRepo) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { code } = req.body;

    if (req.method === 'GET') {
      if (req.query.fromDate) {
        const fromDate = moment(req.query.fromDate).startOf('days').toDate();
        const toDate = moment(req.query.toDate || req.query.fromDate)
          .endOf('days')
          .toDate();

        const query: IBaseRequest<any> = req.query;
        if (!query.condition.$or) {
          query.condition.$or = [
            { schedules: { $size: 0 } },
            { $and: [{ 'schedules.fromDate': { $gte: toDate } }, { 'schedules.toDate': { $lte: fromDate } }] },
          ];
        }
      }
    }

    if (req.method === 'POST' && code) {
      const condition: ICondition<Room> = { code };
      const room = await this.roomRepo.findOne({ condition });
      if (room) {
        throw new ValidateException({ code: ['ROOM_CODE_EXISTS'] });
      }
    }

    if (req.method === 'PUT' && code) {
      const condition: ICondition<Room> = { code, _id: { $ne: req.params.id } };
      const room = await this.roomRepo.findOne({ condition });
      if (room) {
        throw new ValidateException({ code: ['ROOM_CODE_EXISTS'] });
      }
    }

    if (req.method === 'DELETE') {
      const condition: ICondition<Room> = { code };
      const room = await this.roomRepo.findOne({ condition });
      if (room?.status !== RoomStatus.ACTIVATED) {
        throw new BadRequestException('ROOM_NOT_AVAILABLE');
      }
    }

    return next.handle();
  }
}
