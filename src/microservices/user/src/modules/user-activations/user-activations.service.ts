import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserActivation,
  UserActivationDocument,
} from './schemas/user-activations.schema';

export class UserActivationService extends BaseService<UserActivationDocument> {
  constructor(
    @InjectModel(UserActivation.name)
    private userActivationModel: Model<UserActivationDocument>,
  ) {
    super(userActivationModel);
  }
}
