import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvAttachDocument = CvAttach  & CustomMongooseDocument;

@Schema({ collection: 'cv_attach' })
export class CvAttach {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  contentType: string;

  @Prop()
  cvId: string;

  @Prop()
  fileSize: string;

  @Prop()
  link: string;
  
  @Prop()
  name: string;

  @Prop()
  lastUpdate: Date

  @Prop()
  updateBy: string
  
}

export const CvAttachSchema = SchemaFactory.createForClass(CvAttach);
