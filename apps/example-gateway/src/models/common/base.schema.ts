import { MongoSchema, ObjectId, Prop } from '@joktec/mongo';
import { EXAMPLE_MONGO_ID } from '../../app.constant';

export class BaseSchema extends MongoSchema {
  get id(): string {
    return this._id?.toString();
  }

  set id(value: string) {
    this._id = value;
  }

  @Prop({ type: ObjectId, default: null, immutable: true, example: EXAMPLE_MONGO_ID, swagger: { readOnly: true } })
  createdBy?: ObjectId;

  @Prop({ type: ObjectId, default: null, example: EXAMPLE_MONGO_ID, swagger: { readOnly: true } })
  updatedBy?: ObjectId;
}

export class BaseSubSchema extends MongoSchema {}
