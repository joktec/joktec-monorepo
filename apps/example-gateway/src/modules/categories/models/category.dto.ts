import { ApiProperty, PickType } from '@joktec/core';
import { Prop } from '@joktec/mongo';
import { Category } from './category';

export class CategoryDto extends PickType(Category, ['title', 'description'] as const) {
  @Prop()
  @ApiProperty()
  customField!: boolean;
}
