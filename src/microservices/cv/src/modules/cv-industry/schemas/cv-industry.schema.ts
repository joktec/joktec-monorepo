import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvIndustryDocument = CvIndustry  & CustomMongooseDocument;

@Schema({ collection: 'cv_industry' })
export class CvIndustry {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  lastUpdate: Date;

  @Prop()
  updatedBy: string;

  @Prop()
  cvId: string;

  @Prop()
  industryId: string;

  @Prop()
  nameIndustry: string;
  
}

export const CvIndustrySchema = SchemaFactory.createForClass(CvIndustry);
