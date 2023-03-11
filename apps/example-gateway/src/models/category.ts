import { ApiProperty, BaseListResponse } from '@joktec/core';
import { BaseSchema, modelOptions, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'categories' } })
export class Category extends BaseSchema {
  @prop({
    type: String,
    required: [true, 'NAME_REQUIRED'],
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  @ApiProperty({ type: String, required: true, example: 'Kitty', description: 'The name of the category' })
  name!: string;

  @prop({
    type: String,
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  @ApiProperty({ type: String, example: 'Lorem Ipsum', description: 'The description of the category' })
  description!: string;
}

export class CategoryListResponse extends BaseListResponse(Category) {}
