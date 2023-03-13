import { ApiProperty, BaseListResponse } from '@joktec/core';
import { modelOptions, MongoSchema, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'categories' } })
export class Category extends MongoSchema {
  @prop({
    type: String,
    required: [true, 'NAME_REQUIRED'],
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  @ApiProperty({ type: String, required: true, example: 'Book' })
  name!: string;

  @prop({
    type: String,
    minlength: [10, 'NAME_LENGTH_INVALID'],
    maxlength: [255, 'NAME_LENGTH_INVALID'],
  })
  @ApiProperty({ type: String, example: 'Lorem Ipsum' })
  description!: string;
}

export class CategoryListResponse extends BaseListResponse(Category) {}
