import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessDocument = Process & Document;

@Schema({ collection: 'process' })
export class Process {
  @Prop()
  processId: number;

  @Prop()
  databaseInclude?: Array<string>;

  @Prop()
  tableInclude?: Array<string>;

  @Prop()
  databaseExclude?: Array<string>;

  @Prop()
  tableExclude?: Array<string>;

  @Prop()
  isAllowSync?: boolean = false;

  @Prop()
  isSyncRunning?: boolean = false;

  @Prop()
  createdAt?: Date = new Date();

  @Prop()
  updatedAt?: Date = new Date();

  @Prop()
  createdBy?: string = 'migration';

  @Prop()
  updatedBy?: string = 'migration';
}

export const ProcessSchema = SchemaFactory.createForClass(Process);
