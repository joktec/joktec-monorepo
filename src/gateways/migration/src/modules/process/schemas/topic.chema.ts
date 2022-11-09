import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema({ collection: 'topic' })
export class Topic {
  @Prop()
  processId: number;

  @Prop()
  name: string;

  @Prop()
  partition?: number = 0;

  @Prop()
  offset?: string = '0';

  @Prop()
  createdAt?: Date = new Date();

  @Prop()
  updatedAt?: Date = new Date();

  @Prop()
  createdBy?: string = 'migration';

  @Prop()
  updatedBy?: string = 'migration';
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
