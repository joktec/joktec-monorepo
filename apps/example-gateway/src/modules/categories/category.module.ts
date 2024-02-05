import { Module } from '@joktec/core';
import { UserModule } from '../users';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [UserModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
