import { Module } from '@joktec/core';
import { UserModule } from '../users';
import { CategoryController } from './category.controller';
import { CategoryRepo } from './category.repo';
import { CategoryService } from './category.service';

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryRepo, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
