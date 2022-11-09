import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type YearOfExperienceDocument = YearOfExperience & CustomMongooseDocument;

@Schema({ collection: 'year_of_experience' })
export class YearOfExperience {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  nameEn: string;

  @Prop({
    type: Number,
  })
  maxYear: number;

  @Prop({
    type: Number,
  })
  minYear: number;

  @Prop({
    type: Number,
  })
  priority: number;
}

export const YearOfExperienceSchema = SchemaFactory.createForClass(YearOfExperience);
