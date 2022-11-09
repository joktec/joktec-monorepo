import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type SalaryDocument = Salary & CustomMongooseDocument;

@Schema({ collection: 'salary' })
export class Salary {
  @Prop({
    type: Number,
  })
  salaryMin: number;

  @Prop({
    type: Number,
  })
  salaryMax: number;

  @Prop({
    type: String,
  })
  salaryCurrency: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  nameEng: string;

  @Prop({
    type: String,
  })
  relatedId: string;

  @Prop({
    type: Number,
  })
  isDefault: number;

  @Prop({
    type: Number,
  })
  priority: number;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
