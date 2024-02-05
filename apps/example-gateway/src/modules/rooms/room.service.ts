import { BaseService, ICondition, Injectable } from '@joktec/core';
import moment from 'moment';
import { RoomStatus } from '../../models/constants';
import { Room } from '../../models/entities';
import { RoomRepo } from '../../repositories';

@Injectable()
export class RoomService extends BaseService<Room, string> {
  constructor(protected roomRepo: RoomRepo) {
    super(roomRepo);
  }

  async findAvailableRooms(_fromDate: Date, _toDate?: Date): Promise<Room[]> {
    const fromDate = moment(_fromDate).startOf('days').toDate();
    const toDate = moment(_toDate || _fromDate)
      .endOf('days')
      .toDate();

    return this.roomRepo.find({
      condition: {
        status: RoomStatus.ACTIVATED,
        $or: [
          { schedules: { $size: 0 } },
          { $and: [{ schedules: { fromDate: { $gte: toDate } } }, { schedules: { toDate: { $lte: fromDate } } }] },
        ],
      },
    });
  }

  async removeSchedule(orderId: string) {
    const condition: ICondition<Room> = { schedules: { orderId } };
    const updateData: any = { $pull: { schedules: { orderId } } };
    await this.roomRepo.update({ ...condition }, { ...updateData });
  }
}
