import { mongoose, plugin, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

const softDelete = require('mongoose-delete');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

export interface BaseSchema extends Base {}

@plugin(beautifyUnique)
@plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true, indexFields: true })
export abstract class BaseSchema extends TimeStamps {
  @prop({ type: mongoose.Types.ObjectId, default: null })
  createdBy?: mongoose.Types.ObjectId;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  updatedBy?: mongoose.Types.ObjectId;

  @prop({ type: Boolean, default: false })
  deleted?: Date;

  @prop({ type: Date, default: null })
  deletedAt?: Date;

  @prop({ type: mongoose.Types.ObjectId, default: null })
  deletedBy?: mongoose.Types.ObjectId;
}
