import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../department.constants';

export type DepartmentDocument = Department & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Department {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: true,
  })
  name: String;
  @Prop({
    type: Number,
    default: 0,
  })
  priority: Number;
  // * Migration fields
  @Prop()
  departmentId: String;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
