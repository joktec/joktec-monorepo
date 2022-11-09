import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobBoardApplyLogDocument = JobBoardApplyLog  & CustomMongooseDocument;

@Schema({ collection: 'job_board_apply_log' })
export class JobBoardApplyLog {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  applyTime: Date;

  @Prop()
  cvId: string;

  @Prop()
  cvLink: string;

  @Prop()
  jobBoard: string;

  @Prop()
  jobBoardLink: string;

  @Prop()
  jobId: string;

  @Prop()
  jobseekerId: string;

  @Prop()
  message: string;

  @Prop()
  screenshotFile: string;

  @Prop()
  status: string;
}

export const JobBoardApplyLogSchema =
  SchemaFactory.createForClass(JobBoardApplyLog);
