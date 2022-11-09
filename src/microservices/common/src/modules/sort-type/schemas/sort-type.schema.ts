import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type SortTypeDocument = SortType & CustomMongooseDocument;

@Schema({ collection: 'sort_type' })
export class SortType {
  @Prop({
    type: String,
  })
  value: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  nameEng: string;

  @Prop({
    type: Number,
  })
  isDefault: number;

  @Prop({
    type: Number,
  })
  priority: number;
}

export const SortTypeSchema = SchemaFactory.createForClass(SortType);
