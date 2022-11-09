import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SortTypeService } from './sort-type.service';
import { SortTypeController } from './sort-type.controller';
import { SortType, SortTypeSchema } from './schemas/sort-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SortType.name, schema: SortTypeSchema },
    ]),
  ],
  providers: [SortTypeService],
  controllers: [SortTypeController],
  exports: [SortTypeService],
})
export class SortTypeModule { }
