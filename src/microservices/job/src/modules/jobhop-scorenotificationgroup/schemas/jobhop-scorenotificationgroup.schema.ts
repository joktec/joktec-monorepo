import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobhopScoreNotificationGroupDocument =
  JobhopScoreNotificationGroup & CustomMongooseDocument;

@Schema({ collection: 'jobhop_scorenotificationgroup' })
export class JobhopScoreNotificationGroup {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  name: string;
}

export const JobhopScoreNotificationGroupSchema = SchemaFactory.createForClass(
  JobhopScoreNotificationGroup,
);
