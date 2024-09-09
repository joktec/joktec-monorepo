import { BaseService, ICondition, IListResponseDto, Inject, Injectable, REQUEST } from '@joktec/core';
import { IRequest } from '../../app.constant';
import { SuccessResponse } from '../../common';
import { Notification, User } from '../../models/schemas';
import { NotificationRepo } from '../../repositories';
import { NotificationFilterDto, NotificationReadDto, ReadStatus } from './models';

@Injectable()
export class NotificationService extends BaseService<Notification, string> {
  constructor(
    protected notificationRepo: NotificationRepo,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(notificationRepo);
  }

  async paginate(query: NotificationFilterDto): Promise<IListResponseDto<Notification>> {
    if (query.readStatus) {
      switch (query.readStatus) {
        case ReadStatus.UNREAD:
          query.condition.readById = { $ne: this.request.loggedUser._id } as any;
          break;
        case ReadStatus.READ:
          query.condition.readById = { $eq: this.request.loggedUser._id } as any;
          break;
      }
    }
    return super.paginate(query);
  }

  async read(dto: NotificationReadDto, user: User): Promise<SuccessResponse> {
    const condition: ICondition<Notification> = {
      readById: { $ne: this.request.loggedUser._id } as any, // Exclude read notify
      $or: [
        // Just get only owner notify
        { userIds: { $size: 0 } as any },
        { userIds: { $in: user._id } },
      ],
    };
    if (dto?.notificationIds?.length) {
      Object.assign(condition, { _id: { $in: dto.notificationIds } });
    }

    const notifications: Notification[] = await this.notificationRepo.find({ condition });
    if (!notifications.length) return { success: true };
    const docs = notifications.map(notification => {
      return { _id: notification._id, $push: { readById: user._id } };
    });
    await this.notificationRepo.bulkUpsert(docs);
    return { success: true };
  }
}
