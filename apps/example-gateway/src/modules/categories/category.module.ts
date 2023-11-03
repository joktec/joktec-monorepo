import { Module } from '@joktec/core';
import { SessionModule } from '../sessions';
import { UserModule } from '../users';
import { CategoryController } from './category.controller';
import { CategoryRepo } from './category.repo';
import { CategoryService } from './category.service';
import { CategoryInterceptor } from './hooks';

@Module({
  imports: [SessionModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryRepo, CategoryService, CategoryInterceptor],
  exports: [],
})
export class CategoryModule {}
