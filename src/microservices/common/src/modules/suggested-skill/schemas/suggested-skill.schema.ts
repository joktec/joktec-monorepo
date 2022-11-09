import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type SuggestedSkillDocument = SuggestedSkill & CustomMongooseDocument;

@Schema({ collection: 'suggested_skill' })
export class SuggestedSkill {
  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: Number,
  })
  isActive: number;
}

export const SuggestedSkillSchema = SchemaFactory.createForClass(SuggestedSkill);
