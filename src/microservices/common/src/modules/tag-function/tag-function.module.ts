import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagFunctionService } from './tag-function.service';
import { TagFunctionController } from './tag-function.controller';
import { TagFunction, TagFunctionSchema } from './schemas/tag-function.schema';
import { TagSubFunctionModule } from '../tag-sub-function';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TagFunction.name, schema: TagFunctionSchema },
    ]),
    forwardRef(() => TagSubFunctionModule),
  ],
  providers: [TagFunctionService],
  controllers: [TagFunctionController],
  exports: [TagFunctionService],
})
export class TagFunctionModule { }
