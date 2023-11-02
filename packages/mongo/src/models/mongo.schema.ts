import { ApiProperty, Field, ICondition, Type } from '@joktec/core';
import { prop, ReturnModelType } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';
import { ParanoidQueryOptions } from '../plugins/paranoid.plugin';
import { QueryHelper } from './mongo.method';
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

  public static destroyOne<T>(
    this: ReturnModelType<typeof MongoSchema, QueryHelper<T>>,
    filter?: ICondition<T>,
    options?: ParanoidQueryOptions<T>,
  ): QueryWithHelpers<T, T> {
    return this.findOne().destroyOne(filter, options);
  }

  public static restore<T>(
    this: ReturnModelType<typeof MongoSchema>,
    filter: ICondition<T>,
    options?: ParanoidQueryOptions<T> & { restoredBy?: string | ObjectId | any },
  ): QueryWithHelpers<T, T> {
    return this.findOne().restore(filter, options);
  }

  public static destroyMany<T>(
    this: ReturnModelType<typeof MongoSchema>,
    filter?: ICondition<T>,
    options?: ParanoidQueryOptions<T>,
  ): QueryWithHelpers<{ acknowledged: boolean; deletedCount: number } | UpdateWriteOpResult, any> {
    return this.find().destroyMany(filter, options);
  }
}
