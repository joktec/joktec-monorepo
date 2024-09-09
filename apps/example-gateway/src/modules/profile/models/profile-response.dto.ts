import { PickType } from '@joktec/core';
import { SuccessResponse } from '../../../common';
import { User } from '../../../models/schemas';

export class UserProfileResponse extends PickType(User, [
  '_id',
  'address',
  'artistIds',
  'avatar',
  'email',
  'nickname',
  'profile',
  'rank',
  'wallet',
  'artists',
] as const) {}

export class UserLogoutDto extends SuccessResponse {}
