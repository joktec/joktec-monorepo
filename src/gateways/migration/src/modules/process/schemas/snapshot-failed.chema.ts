import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnapshotFailedDocument = SnapshotFailed & Document;

@Schema({ collection: 'snapshot_failed' })
export class SnapshotFailed {
  @Prop()
  processId: number;

  @Prop()
  tableName: string;

  @Prop()
  mysqlId: string;

  @Prop()
  error: string;

  @Prop()
  createdAt?: Date = new Date();

  @Prop()
  updatedAt?: Date = new Date();

  @Prop()
  createdBy?: string = 'migration';

  @Prop()
  updatedBy?: string = 'migration';
}

export const SnapshotFailedSchema =
  SchemaFactory.createForClass(SnapshotFailed);
