import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvLinkDocument = CvLink  & CustomMongooseDocument;

@Schema({ collection: 'cv_link' })
export class CvLink {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  createdDate: Date;

  @Prop()
  lastUpdate: Date;

  @Prop()
  cvId: string;

  @Prop()
  link: string;

  @Prop()
  cvFile: string;

  @Prop()
  fileSize: number;

  @Prop()
  fileName: string;

  @Prop()
  contentType: string;

  @Prop()
  source: string;
  
}

export const CvLinkSchema = SchemaFactory.createForClass(CvLink);
