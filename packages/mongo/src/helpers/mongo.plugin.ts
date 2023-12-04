import { toArray } from '@joktec/core';
import { plugin } from '@typegoose/typegoose';
import { ISchemaOptions } from '../decorators';
import { ObjectId } from '../models';
import { ParanoidOptions, ParanoidPlugin } from '../plugins';

export function buildPlugin(options: ISchemaOptions): ClassDecorator[] {
  const plugins = toArray(options.plugins).map(p => plugin(p.mongoosePlugin, p.options));
  if (options.paranoid) {
    const paranoidOpts: ParanoidOptions = {
      deletedAt: { name: 'deletedAt', type: Date },
      deletedBy: { name: 'deletedBy', type: ObjectId },
    };
    if (typeof options?.paranoid === 'object') {
      Object.assign(paranoidOpts, options.paranoid);
    }
    plugins.push(plugin(ParanoidPlugin, paranoidOpts));
  }
  // plugins.push(plugin(UniquePlugin.mongoosePlugin, UniquePlugin.options));
  return plugins;
}
