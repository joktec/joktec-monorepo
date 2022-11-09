import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvTemplatesDocument = CvTemplates  & CustomMongooseDocument;

@Schema({ collection: 'cv_templates' })
export class CvTemplates {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  linkThumbnail: string;

  @Prop()
  linkOriginal: string;

  @Prop()
  priority: number;

  @Prop()
  nameEng: string;

}

export const CvTemplatesSchema = SchemaFactory.createForClass(CvTemplates);
