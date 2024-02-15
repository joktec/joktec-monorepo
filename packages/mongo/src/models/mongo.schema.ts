import { ApiProperty, Field, ICondition, Type } from '@joktec/core';
import { ReturnModelType } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose, { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';
import { Prop } from '../decorators';
import { QueryHelper } from '../helpers';
import { ParanoidQueryOptions } from '../plugins';
import { ObjectId } from './mongo.request';

export class MongoSchema extends TimeStamps implements Omit<Base<string>, 'id'> {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  @Type(() => String)
  _id: string;

  @Prop({ type: Date, default: new Date(), immutable: true })
  createdAt?: Date;

  @Prop({ type: mongoose.Types.ObjectId, default: null, immutable: true, example: '507f1f77bcf86cd799439011' })
  createdBy?: string;

  @Prop({ type: Date, default: new Date() })
  updatedAt?: Date;

  @Prop({ type: mongoose.Types.ObjectId, default: null, example: '507f1f77bcf86cd799439011' })
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
