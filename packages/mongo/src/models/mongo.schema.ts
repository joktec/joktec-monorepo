import { ApiHideProperty, ApiProperty, Exclude, Field, Type } from '@joktec/core';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ObjectId } from './mongo.request';

export class MongoSchema extends TimeStamps implements Omit<Base<string>, 'id'> {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  @Type(() => String)
  _id!: string;

  @prop({ type: Date, default: new Date(), immutable: true })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @prop({ type: ObjectId, default: null, immutable: true })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  @Type(() => String)
  createdBy?: string;

  @prop({ type: Date, default: new Date() })
  @ApiProperty()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @prop({ type: ObjectId, default: null })
  @ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })
  @Field(() => String, { nullable: true })
  @Type(() => String)
  updatedBy?: string;

  @prop({ type: Date, default: null })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  deletedAt?: Date;

  @prop({ type: ObjectId, default: null })
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  @Type(() => String)
  deletedBy?: string;
}
