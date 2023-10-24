import { ApiProperty, DeepPartial, Field, ICondition, Type } from '@joktec/core';
import { prop, ReturnModelType } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { QueryOptions } from 'mongoose';
import { DELETE_OPTIONS, UPDATE_OPTIONS } from '../mongo.utils';
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

  public static async destroy(
    this: ReturnModelType<typeof MongoSchema>,
    filter: ICondition<any>,
    options?: QueryOptions<any> & { force?: boolean; deletedBy?: string | ObjectId },
  ): Promise<MongoSchema> {
    const isParanoid = Object.values(this.schema.paths).some(schema => !!schema.options.deletedAt);
    if (!isParanoid || options?.force) {
      Object.assign(options, DELETE_OPTIONS);
      return this.findOneAndDelete(filter, options).lean().exec();
    }

    Object.assign(options, UPDATE_OPTIONS);
    const bodyUpdate = Object.values(this.schema.paths).reduce((body, schema) => {
      if (schema.options.deletedAt) body[schema.options.deletedAt] = new Date();
      if (schema.options.deletedBy) body[schema.options.deletedBy] = options?.deletedBy;
      return body;
    }, {});
    return this.findOneAndUpdate(filter, bodyUpdate, options).lean().exec();
  }

  public static async destroyMany(
    this: ReturnModelType<typeof MongoSchema>,
    filter: ICondition<any>,
    options?: QueryOptions<any> & { force?: boolean; deletedBy?: string | ObjectId },
  ): Promise<MongoSchema[]> {
    const docs = await this.find(filter, null, options).lean().exec();

    const isParanoid = Object.values(this.schema.paths).some(schema => !!schema.options.deletedAt);
    if (!isParanoid || options?.force) {
      Object.assign(options, DELETE_OPTIONS);
      await this.deleteMany(filter, options).lean().exec();
    } else {
      const bodyUpdate = Object.values(this.schema.paths).reduce((body, schema) => {
        if (schema.options.deletedAt) body[schema.options.deletedAt] = new Date();
        if (schema.options.deletedBy) body[schema.options.deletedBy] = options?.deletedBy;
        return body;
      }, {});
      Object.assign(options, UPDATE_OPTIONS);
      await this.findOneAndUpdate(filter, bodyUpdate, options).lean().exec();
    }

    return docs;
  }

  public static async restore(
    this: ReturnModelType<typeof MongoSchema>,
    filter: ICondition<any>,
    options?: QueryOptions<any> & { restoredBy?: string | ObjectId },
  ): Promise<MongoSchema> {
    Object.assign(options, UPDATE_OPTIONS, { onlyDeleted: true });
    const bodyUpdate: DeepPartial<MongoSchema> = Object.values(this.schema.paths).reduce((body, schema) => {
      if (schema.options.deletedAt) body[schema.options.deletedAt] = null;
      if (schema.options.deletedBy) body[schema.options.deletedBy] = null;
      return body;
    }, {});
    if (options?.restoredBy) bodyUpdate.updatedBy = options.restoredBy.toString();
    return this.findOneAndUpdate(filter, bodyUpdate, options).lean().exec();
  }
}
