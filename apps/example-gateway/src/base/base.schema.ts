import { MongoSchema, Prop } from '@joktec/mongo';

export class BaseSchema extends MongoSchema {
  @Prop({ type: Date, default: new Date(), immutable: true })
  createdAt?: Date;

  @Prop({ default: null, immutable: true, example: '507f1f77bcf86cd799439011' })
  createdBy?: string;

  @Prop({ type: Date, default: new Date() })
  updatedAt?: Date;

  @Prop({ default: null, example: '507f1f77bcf86cd799439011' })
  updatedBy?: string;
}
