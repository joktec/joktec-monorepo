import { ApiHideProperty, ApiProperty, Exclude, Field, Type } from '@joktec/core';
import { mongoose, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export abstract class MongoSchema extends TimeStamps implements Base<string> {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  @Type(() => String)
  _id!: string;

  @Exclude()
  @ApiHideProperty()
  id: string;

  @prop({ type: Date, default: new Date(), immutable: true })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null, immutable: true })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  @Type(() => String)
  createdBy?: string;

  @prop({ type: Date, default: new Date() })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  @Type(() => String)
  updatedBy?: string;

  @prop({ type: Date, default: null })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  deletedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  @Type(() => String)
  deletedBy?: string;
}
