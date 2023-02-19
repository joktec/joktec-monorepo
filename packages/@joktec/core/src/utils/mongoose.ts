import { uuid } from 'uuidv4';
import { Schema, Model, Document } from 'mongoose';

interface MongooseFields {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;

  // * Migration fields
  readonly sqlId: string;
  readonly createDate: Date;
  readonly lastUpdate: Date;
  readonly createBy: number;
  readonly updateBy: number;
}

interface MongooseMethods {
  readonly $create: Function;
  readonly $update: Function;
  readonly $delete: Function;
}

/**
 * Custom Document types with additional fields and methods
 */
export interface CustomMongooseDocument extends Document, MongooseFields, MongooseMethods {}

/**
 * Custom Model types with custom MongooseDocument
 */
export interface CustomMongooseModel extends Model<CustomMongooseDocument> {}

/**
 * Replace native mongoose's `timestamps` with additional `deletedAt` field
 * @param schema Mongoose Schema
 * @param _ Options
 */
export const timestampsPlugin = (schema: Schema, _: any) => {
  // custom fields
  schema.add({
    _id: {
      type: String,
      default: uuid(),
    },
    sqlId: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,

    // * Migration fields
    createDate: Date,
    lastUpdate: Date,
    createBy: Number,
    updateBy: Number,
  });

  // remove private fields on toJSON
  schema.set('toJSON', {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform: (_: any, ret: any) => ({
      ...ret,
      _id: undefined,
      deletedAt: undefined,
    }),
  });

  // attach conditions on find hooks
  const hooks = {
    query() {
      (this as any).where({
        deletedAt: { $exists: false },
      });
    },
  };

  [
    'count',
    'countDocuments',
    'find',
    'findOne',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ].forEach(method => schema.pre(method as any, hooks.query));

  // custom methods with fields injected on create, update & delete
  // tslint:disable-next-line: no-object-mutation
  Object.assign(schema.methods, {
    $create() {
      (this as any).set({
        _id: uuid(),
        createdAt: Date.now(),
        createDate: Date.now(),
      });

      return (this as any).save();
    },

    $update(changes: { readonly [key: string]: any }) {
      (this as any).set({
        ...changes,
        updatedAt: Date.now(),
        lastUpdate: Date.now(),
      });

      return (this as any).save();
    },

    $delete() {
      (this as any).set({
        deletedAt: Date.now(),
      });

      return (this as any).save();
    },
  });
};
