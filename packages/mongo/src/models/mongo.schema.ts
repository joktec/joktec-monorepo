import { mongoose, plugin, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ApiProperty, Field } from '@joktec/core';

const softDelete = require('mongoose-delete');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

export interface MongoSchema extends Base {}

@plugin(beautifyUnique, { defaultMessage: '{PATH}_MUST_BE_UNIQUE' })
@plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true, indexFields: true })
export abstract class MongoSchema extends TimeStamps {
  @prop({ type: Date, default: new Date() })
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  createdBy?: mongoose.Types.ObjectId;

  @prop({ type: Date, default: new Date() })
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  updatedBy?: mongoose.Types.ObjectId;

  @prop({ type: Date, default: null })
  @ApiProperty({ type: Date })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  deletedBy?: mongoose.Types.ObjectId;
}
