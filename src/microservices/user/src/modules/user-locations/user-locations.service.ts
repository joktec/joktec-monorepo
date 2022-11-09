import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserLocation,
  UserLocationDocument,
} from './schemas/user-locations.schema';

export class UserLocationService extends BaseService<UserLocationDocument> {
  constructor(
    @InjectModel(UserLocation.name)
    private userLocationModel: Model<UserLocationDocument>,
  ) {
    super(userLocationModel);
  }
}
