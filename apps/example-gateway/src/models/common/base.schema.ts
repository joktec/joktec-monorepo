import { MongoSchema, ObjectId, Prop } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';

export class BaseSchema extends MongoSchema {
  @Prop({ type: ObjectId, default: null, immutable: true, example: EXAMPLE_MONGO_ID, swagger: { readOnly: true } })
  createdBy?: ObjectId;

  @Prop({ type: ObjectId, default: null, example: EXAMPLE_MONGO_ID, swagger: { readOnly: true } })
  updatedBy?: ObjectId;
}

export class BaseSubSchema extends MongoSchema {}
