import { MongoSchema, ObjectId, Prop } from '@joktec/mongo';

export class BaseSchema extends MongoSchema {
  @Prop({ default: null, immutable: true, example: '507f1f77bcf86cd799439011' })
  createdBy?: ObjectId;

  @Prop({ default: null, example: '507f1f77bcf86cd799439011' })
  updatedBy?: ObjectId;
}
