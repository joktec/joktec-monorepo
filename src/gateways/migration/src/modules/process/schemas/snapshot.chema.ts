import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnapshotDocument = Snapshot & Document;

@Schema({ collection: 'snapshot' })
export class Snapshot {
  @Prop()
  processId: number;

  @Prop()
  tableName: string;

  @Prop()
  totalMigrated?: number;

  @Prop()
  status?: string;

  @Prop()
  message?: string;

  @Prop()
  createdAt?: Date = new Date();

  @Prop()
  updatedAt?: Date = new Date();

  @Prop()
  createdBy?: string = 'migration';

  @Prop()
  updatedBy?: string = 'migration';
}

export const SnapshotSchema = SchemaFactory.createForClass(Snapshot);
