import { ObjectId, Prop, Ref, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { User } from './user.schema';

@Schema({
  collection: 'connections',
  unique: ['followerId,followeeId'],
  index: ['followerId', 'followeeId'],
  paranoid: true,
})
export class Connection extends BaseSchema {
  @Prop({ type: ObjectId, ref: () => User, required: true, comment: 'I am following someone' })
  followeeId?: Ref<User, string>;

  @Prop({ type: ObjectId, ref: () => User, required: true, comment: 'Someone is following me' })
  followerId?: Ref<User, string>;

  // Virtual
  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'followerId', justOne: true, example: {} })
  follower?: Ref<User>;

  @Prop({ type: User, ref: () => User, foreignField: '_id', localField: 'followeeId', justOne: true, example: {} })
  followee?: Ref<User>;
}
