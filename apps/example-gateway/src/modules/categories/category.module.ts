import { Module } from '@joktec/core';
import { CategoryController } from './category.controller';
import { CategoryRepo } from './category.repo';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryRepo, CategoryService],
  exports: [],
})
export class CategoryModule {}
