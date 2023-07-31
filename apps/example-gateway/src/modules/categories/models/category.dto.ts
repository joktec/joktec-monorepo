import { PickType } from '@joktec/core';
import { Category } from './category';

export class CategoryDto extends PickType(Category, ['name', 'description'] as const) {}
