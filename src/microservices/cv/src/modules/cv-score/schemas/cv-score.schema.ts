import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvScoreDocument = CvScore  & CustomMongooseDocument;

@Schema({ collection: 'cv_score' })
export class CvScore {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  cvId: string;

  @Prop()
  score: string;

  @Prop()
  cvFile: string;
  
}

export const CvScoreSchema = SchemaFactory.createForClass(CvScore);
