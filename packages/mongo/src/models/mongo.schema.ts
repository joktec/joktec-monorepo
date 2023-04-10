import { mongoose, plugin, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Field } from '@joktec/core';

export interface MongoSchema extends Base {}

@plugin(require('mongoose-beautiful-unique-validation'), { defaultMessage: '{PATH}_MUST_BE_UNIQUE' })
export abstract class MongoSchema extends TimeStamps {
  @prop({ type: Date, default: new Date(), immutable: true })
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null, immutable: true })
  @Field(() => String, { nullable: true })
  createdBy?: mongoose.Types.ObjectId;

  @prop({ type: Date, default: new Date() })
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @Field(() => String, { nullable: true })
  updatedBy?: mongoose.Types.ObjectId;

  @prop({ type: Date, default: null })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @Field(() => String, { nullable: true })
  deletedBy?: mongoose.Types.ObjectId;
}
