import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';

export type LevelDocument = Level & CustomMongooseDocument;

@Schema({ collection: 'level' })
export class Level {
  @Prop({
    type: String,
  })
  code: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  nameEng: string;

  @Prop({
    type: Number,
  })
  aiCode: number;

  @Prop({
    type: Number,
  })
  priority: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
