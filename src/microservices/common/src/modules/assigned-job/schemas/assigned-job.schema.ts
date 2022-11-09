import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type AssignedJobDocument = AssignedJob & CustomMongooseDocument;

@Schema({ collection: 'assigned_job' })
export class AssignedJob {
  @Prop({ type: String })
  job: string;

  @Prop({ type: String })
  jobId: string;

  @Prop({ type: String })
  user: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: String })
  groupIds: string;

  @Prop({ type: String })
  platform: string;

  @Prop({ type: String })
  autoAssigned: string;

  @Prop({ type: String })
  createBy: string;

  @Prop({ type: Date })
  createDate: Date;

  @Prop({ type: Date })
  lastUpdate: Date;

  @Prop({ type: Date })
  updateBy: Date;
}

export const AssignedJobSchema = SchemaFactory.createForClass(AssignedJob);
