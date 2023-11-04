import { Module } from '@joktec/core';
import { UserModule } from '../users';
import { CategoryController } from './category.controller';
import { CategoryRepo } from './category.repo';
import { CategoryService } from './category.service';
import { CategoryInterceptor } from './hooks';

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryRepo, CategoryService, CategoryInterceptor],
  exports: [CategoryService],
})
export class CategoryModule {}
