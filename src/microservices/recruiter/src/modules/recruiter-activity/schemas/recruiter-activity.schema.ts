import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RecruiterActivityDocument = RecruiterActivity &
  CustomMongooseDocument;

@Schema({ collection: 'recruiter_activity' })
export class RecruiterActivity {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  recruiterId: string;

  @Prop()
  organizationId: string;

  @Prop()
  objectId: string;

  @Prop()
  objectRepr: string;

  @Prop()
  objectType: string;

  @Prop()
  activityType: string;

  @Prop()
  message: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isSystemActivity: number;

  @Prop()
  messageJson: string;
}

export const RecruiterActivitySchema =
  SchemaFactory.createForClass(RecruiterActivity);
