import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvSkillDocument = CvSkill  & CustomMongooseDocument;

@Schema({ collection: 'cv_skill' })
export class CvSkill {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  lastUpdate: string;

  @Prop()
  updatedBy: string;

  @Prop()
  cvId: string;
  
  @Prop()
  nameSkill: string;

  @Prop()
  skillId: string;
  
}

export const CvSkillSchema = SchemaFactory.createForClass(CvSkill);
