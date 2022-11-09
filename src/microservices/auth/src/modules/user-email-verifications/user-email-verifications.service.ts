import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import {
  UserEmailVerification,
  UserEmailVerificationDocument,
} from './schemas/user-email-verifications.schema';

export class UserEmailVerificationService extends BaseService<UserEmailVerificationDocument> {
  constructor(
    @InjectModel(UserEmailVerification.name)
    private userEmailVerificationModel: Model<UserEmailVerificationDocument>,
  ) {
    super(userEmailVerificationModel);
  }
}
