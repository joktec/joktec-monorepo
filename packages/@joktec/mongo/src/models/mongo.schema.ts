import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface BaseSchema extends Base {}

export abstract class BaseSchema extends TimeStamps {}

export interface SoftSchema extends Base {}

export abstract class SoftSchema extends TimeStamps {
  @prop({ type: Date, default: null })
  deletedAt?: Date;
}
