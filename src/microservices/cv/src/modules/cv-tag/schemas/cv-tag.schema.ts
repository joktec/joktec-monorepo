import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvTagDocument = CvTag  & CustomMongooseDocument;

@Schema({ collection: 'cv_tag' })
export class CvTag {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  cvId: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  function: string;

  @Prop()
  subFunction: string;

  @Prop()
  bunnyEstimate: number;

  @Prop()
  salaryCurrency: string;

  @Prop()
  jobGroups: string;

  @Prop()
  levelName: string;

  @Prop()
  skills: string;
  
}

export const CvTagSchema = SchemaFactory.createForClass(CvTag);
