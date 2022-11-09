import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../skill.constants';

export type SkillDocument = Skill & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Skill {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: String;
  @Prop({
    type: String,
    required: true,
  })
  name: String;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
