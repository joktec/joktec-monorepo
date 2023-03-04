import { BaseSchema, modelOptions, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'categories' } })
export class Category extends BaseSchema {
  @prop({
    type: String,
    required: [true, 'NAME_REQUIRED'],
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  name!: string;

  @prop({
    type: String,
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  description!: string;
}
