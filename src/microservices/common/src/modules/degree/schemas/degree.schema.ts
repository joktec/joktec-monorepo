import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../degree.constants';

export type DegreeDocument = Degree & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Degree {
  @Prop({
    type: String,
    required: [true, 'Code is Required'],
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: [true, 'Name is Required'],
  })
  name: String;
  @Prop()
  nameEng: String;
  @Prop({
    type: Number,
    default: 0,
  })
  priority: Number;
}

export const DegreeSchema = SchemaFactory.createForClass(Degree);
