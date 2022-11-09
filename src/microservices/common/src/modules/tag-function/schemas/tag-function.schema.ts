import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type TagFunctionDocument = TagFunction & CustomMongooseDocument;

@Schema({ collection: 'tag_function' })
export class TagFunction {
  @Prop({
    type: String,
  })
  code: string;

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
  priority: number;
}

export const TagFunctionSchema = SchemaFactory.createForClass(TagFunction);
