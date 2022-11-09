import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type JobseekerVerifyAccountFileDocument = JobseekerVerifyAccountFile  & CustomMongooseDocument;

@Schema({ collection: 'jobseeker_verify_account_file' })
export class JobseekerVerifyAccountFile {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  jobseekerId: string;

  @Prop()
  file: string;

  @Prop()
  fileSize: number;

  @Prop()
  fileName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  contentType: string;

  @Prop()
  verifyAccountId: number;

  @Prop()
  fileKey: string;
}

export const JobseekerVerifyAccountFileSchema = SchemaFactory.createForClass(JobseekerVerifyAccountFile);
