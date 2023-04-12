import { mongoose, plugin, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiHideProperty, ApiProperty, Field } from '@joktec/core';
import { MongoId } from './mongo.request';

export interface MongoSchema extends Base<MongoId> {}

@plugin(require('mongoose-beautiful-unique-validation'), { defaultMessage: '{PATH}_MUST_BE_UNIQUE' })
export abstract class MongoSchema extends TimeStamps {
  @ApiProperty({ type: String })
  @Field(() => String, { nullable: true })
  _id!: MongoId;

  @prop({ type: Date, default: new Date(), immutable: true })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null, immutable: true })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  createdBy?: MongoId;

  @prop({ type: Date, default: new Date() })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  updatedBy?: MongoId;

  @prop({ type: Date, default: null })
  @ApiHideProperty()
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiHideProperty()
  @Field(() => String, { nullable: true })
  deletedBy?: mongoose.Types.ObjectId;
}
