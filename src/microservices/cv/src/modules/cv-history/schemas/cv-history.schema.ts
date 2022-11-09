import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvHistoryDocument = CvHistory  & CustomMongooseDocument;

@Schema({ collection: 'cv_history' })
export class CvHistory {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  cvId: string;
  
  @Prop()
  source: string;

  @Prop()
  modifierId: string;

  @Prop()
  modifierUsername: string;

  @Prop()
  data: string;

  @Prop()
  preData: string;
  
}

export const CvHistorySchema = SchemaFactory.createForClass(CvHistory);
