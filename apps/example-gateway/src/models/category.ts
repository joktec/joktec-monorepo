import { IsString } from '@joktec/core';
import { modelOptions, prop, plugin, SoftSchema } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'categories', timestamps: true } })
@plugin(undefined, {})
export class Category extends SoftSchema {
  @prop({ type: String, required: true, minlength: 10, maxlength: 255 })
  @IsString()
  name!: string;
}
