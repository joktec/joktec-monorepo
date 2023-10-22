import { ApiProperty, PickType } from '@joktec/core';
import { prop } from '@joktec/mongo';
import { Category } from './category';

export class CategoryDto extends PickType(Category, ['title', 'description'] as const) {
  @prop()
  @ApiProperty()
  customField!: boolean;
}
