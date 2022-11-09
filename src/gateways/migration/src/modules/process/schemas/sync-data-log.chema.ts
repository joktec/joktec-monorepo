import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SyncDataLogDocument = SyncDataLog & Document;

@Schema({ collection: 'sync_data_log' })
export class SyncDataLog {
  @Prop()
  processId: number;

  @Prop()
  offset: string;

  @Prop()
  data: string;

  @Prop()
  status: string;

  @Prop()
  createdAt?: Date = new Date();

  @Prop()
  updatedAt?: Date = new Date();

  @Prop()
  createdBy?: string = 'migration';

  @Prop()
  updatedBy?: string = 'migration';
}

export const SyncDataLogSchema = SchemaFactory.createForClass(SyncDataLog);
