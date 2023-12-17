import { OmitType } from '@joktec/core';
import { Prop } from '@joktec/mongo';
import { Category } from './category';

export class CategoryDto extends OmitType(Category, ['parent', 'children'] as const) {
  @Prop()
  customField!: boolean;
}
