import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type TagSubFunctionDocument = TagSubFunction & CustomMongooseDocument;

@Schema({ collection: 'tag_sub_function' })
export class TagSubFunction {
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

  @Prop({
    type: Number,
  })
  functionId: number;
}

export const TagSubFunctionSchema = SchemaFactory.createForClass(TagSubFunction);
