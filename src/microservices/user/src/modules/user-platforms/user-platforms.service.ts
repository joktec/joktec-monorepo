import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserPlatform,
  UserPlatformDocument,
} from './schemas/user-platforms.schema';

export class UserPlatformService extends BaseService<UserPlatformDocument> {
  constructor(
    @InjectModel(UserPlatform.name)
    private userPlatformModel: Model<UserPlatformDocument>,
  ) {
    super(userPlatformModel);
  }
}
