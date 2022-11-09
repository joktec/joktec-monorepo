import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSubFunctionService } from './tag-sub-function.service';
import { TagSubFunctionController } from './tag-sub-function.controller';
import { TagSubFunction, TagSubFunctionSchema } from './schemas/tag-sub-function.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TagSubFunction.name, schema: TagSubFunctionSchema },
    ]),
  ],
  providers: [TagSubFunctionService],
  controllers: [TagSubFunctionController],
  exports: [TagSubFunctionService],
})
export class TagSubFunctionModule { }
